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
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
