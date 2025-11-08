import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Navbar from './components/shared/Navbar.jsx'
import Home from './components/Home.jsx'
import Signup from './components/auth/Signup.jsx'
import Login from "./components/auth/Login.jsx"
import Jobs from  "./components/Jobs.jsx"
import Browse from "./components/Browse.jsx"
import Profile from "./components/Profile.jsx"
import JobDescription from "./components/JobDescription.jsx"
import Companies from "./components/admin/Companies.jsx"
import CompanyCreate from "./components/admin/CompanyCreate.jsx"
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

  //admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate/>
  }
])
function App() {    
  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
