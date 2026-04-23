import React from "react";
import { useState } from "react";
import Navbar from "../../../components/shared/Navbar.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import store from "../../redux/store.js";
import { setLoading } from "../../../redux/authSlice.js";
import { Loader2 } from "lucide-react";
const Signup = () => {
  // USESTATE() IN REACT :- (1. if you want any change in UI on basis of any event then useState() is there
  //2. what we do in state in react is :- in component we declare a state variable which is object(input,setinput) in himself , and if there any changes occur in variable it will re-render full component , as it re-renders it will return again so we will get updated value there
  //3.  remember useState() methods always returns array which has two elements/values:- 1. the current state , During the first render , it will match the initial state you have passed. 2.  the set function that lets you update the state to a different value trigers a re render
  //4. useState Provides array with [0,f] here 0 is let say initial state , f is function
  // 5. below we destructure array with two values - Oth index array by input , 1th index by setInput
  //6. you have to use setInput method to change UI/DOM , because only setInput triggers re-render
  //7. Callback usage in Updater Function due to async nature of method , when new value depends on previous value)
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    //below [e.target.name] is computed property name  in object which use the value inside as key , when we have a object like here in useState() then [e.target.name] , so first iss variable ki value evaluate hogi , then iski value use hogi like .name mai hai kya fullName
    // ...input ke pass old state ki copy hoti hai - manlo for eg - above fullname mai "abcdef" tha and password mai - "123" if haam ...input hata dete hain aur user password change krdeta hai -"456", then old state copy nahi hogi means fullname hat jayega and even password ka old data bhi hat jayega 
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  // whenever any event occur in this method , we always have event object , that event has target key ,{vvv.imp  that event.target has that element }
  // so event.target - the element you want to change (like -input,textarea) & event.target.value means change/track value
  const changeFileHandler = (e) => {
    //Spread operator copies all existing properties of input object.So it creates a shallow copy of the object.
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    //prevent form submit from predefined rules
    e.preventDefault();
    //check below what it is returning ,probably you will get full object
    // console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//         Steps: // Open your app // Right click → Inspect // Go to Network tab // Submit your form // Click the request (/register)
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // withCredentials mean - “If cookies exist, include them in request” , in first request/signup it does not happen , means no cookies send
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
// <header> - top of the page ke liye hota hai 
// <nav> - used for navigation links mainly in navbar 
// <main> - main content of the page (only once per page)
// <section> - grouping related (like a particular work in particular)
// <article> - Independent content (blogs, posts, cards)
// <footer> - Bottom section
// <aside> - Side content (ads, sidebars)
// header , nav , footer - <main> se bahar hote hain 
// use react-helment or nextjs for better seo 
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        {/*FORMS IN REACT
         1. input , button these elements in form have some internal state, default behaviour , so we use controlled components , for eg:- if we are submitting form and want to track events like onChange etc then our page instantly refresh as soon as we clicks onSubmit
         2. we want react Usestate() to control form elements , so we control all input elements of form 
         3. ?? - kisi form ke input variable ko associate krne ke liye - adding state variable in its value to create coonection between both like this -  <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="Enter your Phone Number" />
         4. but for change value of state variable in input we use to track an onChange Event , remember - until this step ui is not changing changing only console is changing - for this you have to use set fn of use state 
         5. Architecture follows here - input change hoga - then onChange event invoke hoga - then handleNameChange method hoga - set fn hoga (e.target.value)
         6. labels - htmlFor in label and id in Input , both must be same 
         7. Handling Multiple Inputs in Forms - Instead of making multiple changeEventHandler - so we make a single Handler jo un sabhi input ke onChange pr jake invoke hora hoga - 
         8. so we make a common object inside which all state variables related to form stores - and what exist there is like input.fullName , input.username, etc
         9. so we need two things 1. which field change so use - event.target.name (so target must have name property so input element ke andar name property honi chahiye & interestingly name property ki value state variable se match krni chahiye (fullname then name = fullname)) , 2. we need value of field - event.target.value
         10. VVV Imp Point - as now we are dealing with object then changing the key only , doesn't works ,hame purani object ko deconstruct krke new object send krni padti hai , tabhi object ka change valid mana jata hai 
         11. tumhara input field me jo - name hai woh , and useState mai job initial object hain , woh mongoose Schema se match hone chahiye , chahe toh onChange() event handler dekhlo 
         12. type field in Input- text, email, password, number, file, checkbox, radio, date, submit
         */}
        <form
          // below it is event
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your Full Name"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your Email"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your Phone Number"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-3">
              <div className="flex items-center space-x-2 ">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 cursor-pointer">
              Sign Up
            </Button>
          )}
          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;


// Classical Approach for Submit form -
//  <form action="/submit" method="POST">
  // <input name="email" />
//   <button type="submit">Submit</button>
// </form>


// What FormData actually is

// FormData is a built-in browser API that lets you construct data in the same format as an HTML <form> would send.

// const formData = new FormData();

// This creates an empty container that stores key-value pairs.

// 🔹 What .append() is doing

// Each line:

// formData.append("fullname", input.fullname);

// means:

// 👉 “Add a field named fullname with value = input.fullname”

// Internally it becomes something like:

// fullname=Mayank
// email=test@gmail.com
// phoneNumber=1234567890
// password=123456
// role=student

// But not in JSON format.

// Instead, it’s sent as:

// Content-Type: multipart/form-data
// 🔹 How data actually goes to backend

// When you send this using fetch or axios:

// await fetch("/api/signup", {
//   method: "POST",
//   body: formData
// });

// 👉 Browser automatically:

// Converts it into multipart/form-data
// Adds boundary (important for backend parsing)
// Sends like a real HTML form submission
// 🔹 Important behavior (VERY IMPORTANT)

// If you use FormData:

// ❌ You should NOT do:

// headers: {
//   "Content-Type": "application/json"
// }

// 👉 Because:

// FormData is NOT JSON
// Browser will automatically set correct headers
// 🔹 Is this the STANDARD way for signup?

// 👉 Short answer: No (for normal signup forms)
// 👉 It’s used in specific cases

// ✅ When FormData is the RIGHT choice

// Use it when:

// File upload is involved

// formData.append("profilePic", file);
// Mixed data (text + file)
// You want to mimic traditional HTML form submission
// ❌ For normal signup (your case)

// Your data is:

// fullname, email, phoneNumber, password, role

// 👉 This is pure JSON data

// 👉 Standard way is:

// await fetch("/api/signup", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(input)
// });
// 🔥 Why JSON is preferred here
// Cleaner
// Easier backend parsing (req.body)
// Standard in REST APIs
// Smaller payload than multipart
// 🔹 So what are you doing right now?

// You are:
// ✔ Sending correct data
// ❌ But using a heavier format than needed

// 🔹 Real-world practice (important for interviews)

// 👉 Most companies expect:

// JSON for normal forms
// FormData only for file uploads
// 🔹 Quick Comparison
// Feature	FormData	JSON
// Format	multipart/form-data	application/json
// File upload	✅ Best	❌ Not suitable
// Simplicity	❌ Slightly complex	✅ Simple
// Common usage	Forms with files	APIs / Auth / Signup
// 🔥 Final verdict

// 👉 Your code is correct but not optimal
// 👉 Better approach for signup:

// JSON.stringify(input)
// 🔹 Now test your understanding (important 🚀)

// Answer these:

// Why should we NOT manually set Content-Type when using FormData?
// What problem will occur if backend expects JSON but we send FormData?
// When building your PlacementPrep app, which one will you use for:
// profile image upload?
// login/signup?

// Reply with answers — I’ll correct and push you deeper 👍

// explain me json.stringify and json.parse now with detail what they do with these all - if this is the code of file - import React from "react";
// import {Label}  from "@/components/ui/label.jsx";
// import {Input} from "@/components/ui/Input.jsx";
// import {Button} from "@/components/ui/button.jsx";
// import {useState} from "react"; 
// const SignUp = () =>{
//   const [input,setInput] = useState({
//    fullName:"",
//    email:"",
//    phoneNumber:"",
//    password:""
//   });
//   const changeInputHandler = (e)=>{
//      setInput({...input,[e.target.name]:e.target.value});
//   }
//   const submitFormHandler = (e) =>{
//     e.preventDefault();
//     //steps - mujhe ab iss form ke pure data ko api call ke through backend tak bhejna hai
//     // step 1 - sabse phle iss data ko ek single variable mein store krna hai 
//     // step - 2 - then try / catch and then axios ke though api call and post method and variable ka data 
//     const formData = 
//   }
//     return <> 
//      <div className="max-w-7xl mx-auto p-4 ">
//       <form onSubmit={submitFormHandler}>
//         <div>
//           <Label htmlFor="fullName">Full Name</Label>
//           <Input type="text" name="fullName" id="fullName" value={input.fullName} onChange={changeInputHandler}/>
//           <Label htmlFor="email">Email</Label>
//           <Input id="email" name="email" type="email" value={input.email} onChange={changeInputHandler}/>
//           <Label htmlFor="phoneNumber">Phone Number</Label>
//           <Input id="phoneNumber" name="phoneNumber" type="number" value={input.phoneNumber} onChange={changeInputHandler}/>
//           <Label htmlFor="password">Password</Label>
//           <Input id="password" name="password" type="password" value={input.password} onChange={changeInputHandler}/>
//         </div>
//         <div className="my-2">
//          <Button type="submit">Sign Up</Button>
//         </div>
//       </form>
//      </div>
//     </>
// }

// export default SignUp;

// Good, now you’re asking the right core concept — this is something interviewers love to test.

// I’ll explain this very clearly step-by-step using your exact code context, not theory only.

// 🔹 First: What is JSON actually?

// JSON = JavaScript Object Notation

// 👉 It is just a string format used to send data over network.

// Example:

// const input = {
//   fullName: "Mayank",
//   email: "mayank@gmail.com"
// };

// This is a JavaScript object

// 🔹 What JSON.stringify() does

// 👉 It converts JavaScript object → JSON string

// JSON.stringify(input)
// Output:
// '{"fullName":"Mayank","email":"mayank@gmail.com"}'

// ⚠️ Notice:

// Keys are in double quotes
// Entire thing is a string
// This is what goes over HTTP
// 🔥 Why we need it in YOUR code

// In your form:

// const [input, setInput] = useState({
//   fullName: "",
//   email: "",
//   phoneNumber: "",
//   password: ""
// });

// 👉 input is a JavaScript object

// But HTTP cannot send objects directly ❌
// 👉 It only sends text (string)

// So we convert it:

// const data = JSON.stringify(input);
// 🔹 Final API call (correct way)
// const submitFormHandler = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("/api/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(input)
//     });

//     const result = await response.json(); // ← parsing response
//     console.log(result);

//   } catch (error) {
//     console.log(error);
//   }
// };
// 🔹 What happens step-by-step (VERY IMPORTANT)
// Step 1:

// User fills form → input object updates

// input = {
//   fullName: "Mayank",
//   email: "test@gmail.com",
//   phoneNumber: "123456",
//   password: "123456"
// }
// Step 2:

// You do:

// JSON.stringify(input)

// 👉 Converts into:

// '{"fullName":"Mayank","email":"test@gmail.com","phoneNumber":"123456","password":"123456"}'
// Step 3:

// This string goes in request body:

// POST /api/signup
// Content-Type: application/json

// {"fullName":"Mayank", ...}
// 🔹 Now: What JSON.parse() does

// 👉 Opposite of stringify

// 👉 Converts JSON string → JavaScript object

// Example:
// const str = '{"fullName":"Mayank"}';

// const obj = JSON.parse(str);

// 👉 Output:

// { fullName: "Mayank" }
// 🔥 Where JSON.parse() is used in YOUR app
// 1. Backend (VERY IMPORTANT)

// When backend receives data:

// req.body

// 👉 Express automatically does parsing (using middleware)

// Internally:

// JSON.parse(requestBodyString)
// 2. Frontend (response parsing)

// When you do:

// const result = await response.json();

// 👉 This internally does:

// JSON.parse(responseBody)
// 🔥 BIG PICTURE FLOW (Understand THIS)
// Frontend object
//    ↓
// JSON.stringify()
//    ↓
// JSON string (sent over network)
//    ↓
// Backend receives string
//    ↓
// JSON.parse()
//    ↓
// Backend gets object
// 🔹 Common mistakes (INTERVIEW TRAPS)
// ❌ Mistake 1: Sending object directly
// body: input   // ❌ WRONG

// 👉 Backend gets garbage / undefined

// ❌ Mistake 2: Forgetting headers
// headers: {
//   "Content-Type": "application/json"
// }

// 👉 Without this → backend won’t parse correctly

// ❌ Mistake 3: Double stringify
// JSON.stringify(JSON.stringify(input)) // ❌
// 🔹 Quick Comparison
// Function	Input	Output
// stringify()	JS Object	JSON string
// parse()	JSON string	JS Object
// 🔥 One-line intuition (remember this)

// 👉 stringify = “network bhejne layak bana”
// 👉 parse = “usable object bana”