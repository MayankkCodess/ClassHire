import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/shared/Navbar.jsx";
import { Button } from "../../../../components/ui/button.jsx";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../../../../components/ui/label.jsx";
import { Input } from "../../../../components/ui/input.jsx";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
// in CompanyCreate.jsx , we are dispatching/storing singleCompany in db/redux & here using customHook for retrieve singleCompany detail using useSelector
import useGetCompanyById from "@/hooks/useGetCompanyById.jsx";

const CompanySetup = () => {
  const params = useParams(); //parallely you can do const {id} = useParams();
  //you are passing company._id to custom Hook
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //called when onChange Event triggers by any Input element
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    console.log(e);
    const file = e.target.files?.[0];
    setInput({ ...input, file }); //logo
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;

// --------------------------------------------------------React-Router-Dom---------------------------------------------------------
/*


1️⃣ First understand the problem React Router solves

In normal websites (multi-page apps):
                                    User clicks link
                                    ↓
                                    Browser requests new HTML page from server
                                    ↓
                                    Whole page reloads

Example:

/about
/contact
/login

Each request loads a new HTML page. But React is a SPA (Single Page Application) React loads only one HTML file: index.html

After that React controls navigation.

So when user goes to:

/login
/signup
/jobs

The page does not reload. React simply switches components. This is what React Router does.

2️⃣ What React Router actually is

React Router is a library that allows: URL → Component mapping

Example:
/login  → Login component
/signup → Signup component
/jobs   → Jobs component

3️⃣ Basic architecture of React Router

You usually define routes in App.jsx.

Example:

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from "./components/Signup"
import Login from "./components/Login"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    </BrowserRouter>
  )
}

Meaning:

/signup → Signup component
/login → Login component


4️⃣ What BrowserRouter does

<BrowserRouter>:- This enables client-side routing. It listens to URL changes using: HTML5 History API

So when URL changes: React Router decides which component to render. Instead of refreshing the page.

5️⃣ What Routes does
<Routes>
Routes acts like a switch statement.
It checks URL and renders matching route.

Example:

URL = /login
↓
Routes finds matching path
↓
<Login/>

6️⃣ What Route does
                  <Route path="/login" element={<Login/>}/>

Meaning:
If URL = /login
Render Login component

Structure:
Route
 ├── path
 └── element

7️⃣ Navigation in React Router -  Declarative Navigation (Link , NavLink)

Instead of using: <a href="/login">

we use: <Link to="/login">

Example from your code: <Link to="/login" className="text-blue-600">Login</Link>

Why? Because <a> causes page reload.

But <Link> does:
                change URL
                render component
NO reload

8️⃣ useNavigate (you used this) (Imperative Navigation)

You wrote:
const navigate = useNavigate();

This is used for programmatic navigation.

Example:
navigate("/login")

Meaning: Redirect user to login page

In your code:

if(res.data.success){
   navigate("/login")
}

Flow:
      Signup success
      ↓
      navigate("/login")
      ↓
      Login component renders

🔟 Nested routing (important in big apps)

Example:

/admin
/admin/jobs
/admin/users

Example:

<Route path="/admin" element={<AdminLayout/>}>
   <Route path="jobs" element={<AdminJobs/>}/>
   <Route path="users" element={<AdminUsers/>}/>
</Route>

Meaning:
      AdminLayout remains constant
      Only inner components change
       <Outlet />

11️⃣ URL parameters
Example: /job/123

Route: <Route path="/job/:id" element={<JobDetails/>}/>

Now we access id using: import {useParams} from "react-router-dom"

const {id} = useParams()

If URL: /job/123

Then: id = 123

12️⃣ Query parameters :- Example URL:

/jobs?location=delhi

Access using:

import {useSearchParams} from "react-router-dom"

const [searchParams] = useSearchParams()

searchParams.get("location")

Result: delhi


13️⃣ Protected routes (very important)

Example: /dashboard

Should only work if user logged in.

Example:
      const ProtectedRoute = ({children}) => {
        const {user} = useSelector(store=>store.auth)

        if(!user){
          return <Navigate to="/login"/>
        }

        return children
      }

Usage:
      <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }
      />
      
14️⃣ Layout routes (used in large apps)

Example:

Navbar
Sidebar
Content

Navbar should stay same across pages.

Example:

<Route element={<Layout/>}>
   <Route path="/jobs" element={<Jobs/>}/>
   <Route path="/companies" element={<Companies/>}/>
</Route>

15️⃣ Lazy loading routes (performance)

Example:

const Dashboard = React.lazy(()=>import("./Dashboard"))

This loads component only when needed.



# Core React Router DOM Concepts (Must Know)

1️⃣ Routing Setup
                BrowserRouter
                Routes
                Route

Base of everything
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Home />} />
                        </Routes>
                      </BrowserRouter>


2️⃣ Nested Routing (VERY IMPORTANT)

Used in dashboards, admin panels :- 
                                  <Route path="/admin" element={<AdminLayout />}>
                                    <Route path="jobs" element={<Jobs />} />
                                    <Route path="companies" element={<Companies />} />
                                  </Route>
Concepts:
        Layout-based routing
        <Outlet />


3️⃣ Navigation

Imperative Navigation (JS-based)
useNavigate()
            const navigate = useNavigate();
            navigate("/admin/jobs");

Declarative Navigation:-
                      <Link>
                      <NavLink>
<Link to="/jobs">Jobs</Link>


4️⃣ Dynamic Routes (used everywhere)

<Route path="/companies/:id" element={<CompanyDetails />} />
Hook:
    useParams()
const { id } = useParams();


5️⃣ Route Protection (Auth / Role Based)

Very important for real apps
                            <Route path="/admin" element={<ProtectedRoute />}>

Concepts:
        Private routes
        Role-based access (admin/user)     */
