import React, { useState } from "react";
import Navbar from "../shared/Navbar.jsx";
// import { Label } from "@radix-ui/react-label";
import { Label } from '../ui/label.jsx'
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant.js";
import { toast } from "sonner";//check the correctness of this line 
import { useDispatch } from "react-redux";
//below :- check useGetCompanyById.jsx , companySlice.js & store 
import { setSingleCompany } from "../../redux/companySlice.js"; 

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState("");
    const dispatch = useDispatch();
    
    // It is a post request to database which is happening when user fills companyName and click continue button 
    // My peronal question why not useEffect Here ?? - (for answer - think it working & components life cycle )
    const registerCompany = async ()=>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    "Content-Type":'application/json'
                },
                withCredentials:true
            });
            // why optional chaining motive here ??? 
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your comapany name?you can change this
            later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder=" Google , Microsoft , Atlassian..."
          onChange={(e)=>setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancel</Button>
          <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;


// ---------------------------------------------------------Axios Full Overview------------------------------------------------------------------
/*

1️⃣ What Axios actually is

Axios is a JavaScript HTTP client used to send requests from frontend to backend. It helps you communicate with APIs.

Example: axios.get("/api/jobs")

This means:

Frontend → send HTTP request → Backend API

Axios works in both:

                    Browser (React)
                    Node.js , But in MERN we mainly use it in React frontend.

2️⃣ HTTP methods Axios uses

Axios just wraps HTTP methods.

Main methods:
                Method	Purpose
                GET	Fetch data
                POST	Send new data
                PUT	Update full data
                PATCH	Update partial data
                DELETE	Remove data

Example:

1. GET
      axios.get("/api/jobs")
Used for reading data.

2. POST
      axios.post("/api/register", formData)
Used for creating new data.
Example:
user signup
add job
create post

3. PUT / PATCH
      axios.put("/api/user/1", data)
Used for updating data.

4. DELETE
      axios.delete("/api/job/5")
Used for removing data.

3️⃣ Structure of an Axios request

  VVV.Imp Line -   Typical Axios request: axios.post(url, data, config)

  Example from your code:
                      const res = await axios.post(
                        `${USER_API_END_POINT}/register`,
                        formData,
                        {
                          headers:{
                            "Content-Type":"multipart/form-data"
                          },
                          withCredentials:true
                        }
                      );

  *** So Axios request has 3 parts:
                                    URL
                                    DATA
                                    CONFIG


4️⃣ Do frontend and backend routes need to match? - They must point to the same endpoint.

Example :- #  Backend route:
app.post("/api/v1/user/register", registerUser);

           #  Frontend call:
axios.post("http://localhost:8000/api/v1/user/register")

So the path must match.
But frontend usually stores base URL:
const USER_API_END_POINT = "http://localhost:8000/api/v1/user";
Then call: axios.post(`${USER_API_END_POINT}/register`)

Which becomes: http://localhost:8000/api/v1/user/register


5️⃣ What Axios returns in response - Axios response object looks like this:

{
  data: {},
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
  request: {}
}

Most used property: res.data

Example backend response:
                        res.status(200).json({
                          success:true,
                          message:"User registered",
                          user:user
                        })

Axios receives:
              res = {
                data:{
                  success:true,
                  message:"User registered",
                  user:{}
                }
              }

So in frontend we write:
                        res.data.success
                        res.data.message

6️⃣ Why backend sends success

Example backend:
                res.json({
                  success:true,
                  message:"Login success"
                })

Frontend checks:
                if(res.data.success){
                  navigate("/home")
                }

This is API contract between frontend and backend.

7️⃣ What headers are :- 

Headers contain extra information about request.

Example:
        Content-Type
        Authorization
        Cookie
        Accept

Example header:- 
              headers:{
                "Content-Type":"multipart/form-data"
              }

Meaning: Request contains file data

Other example:
             Content-Type: application/json

Meaning: Request contains JSON data

8️⃣ Why withCredentials:true

You used: withCredentials:true

This allows browser to send cookies.

Example: JWT stored in cookies

Without this:
            cookies not sent
            authentication fails

11️⃣ Common Axios config options - 
                                Timeout
                                timeout:5000

Request fails if >5 seconds:-
                            Base URL
                            axios.create({
                            baseURL:"http://localhost:8000/api"
                            })
                            Authorization header
                            headers:{
                            Authorization:"Bearer token"
                            }

Used for protected APIs.

12️⃣ Axios interceptors (important later)

Intercept requests or responses.

Example:
        Add token automatically
        handle global errors

Example:
        axios.interceptors.request.use((config)=>{
        config.headers.Authorization = token
        return config
        })

13️⃣ Error handling in Axios

Your code:
          catch(error){
            toast.error(error.response.data.message)
          }

Axios error structure:
                      error.response
                      error.response.data
                      error.response.status

14️⃣ Why Axios is used instead of fetch

Advantages:
          automatic JSON parsing
          interceptors
          better error handling
          timeout support
          request cancelation

Example 
        fetch:
        fetch("/api")
        .then(res=>res.json())

        Axios:
        axios.get("/api")
*/