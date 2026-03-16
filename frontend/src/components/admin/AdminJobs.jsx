import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar.jsx'
import { Input } from '../ui/input.jsx'
import { Button } from '../ui/button.jsx'
// useNavigate is a hook from React Router DOM used to programmatically change routes (pages). ,called client side navigation
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable.jsx'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs.jsx'
import { setSearchJobByText } from '@/redux/jobSlice.js'

// React Router -> React Router loads components behalf of URL -> React calls the component function -> then JSX get returned 
// Why we use callback fn or what does it mean :- it means - A function passed to another function to be executed later or after Event happens.(for eg - useEffect)

const AdminJobs = () => {
  // iska kaam hai keval redux mai sabhi jobs jake store karana jo admin ne create kri hain 
  useGetAllAdminJobs();
 
  // React creates a state variable inside its internal memory.
  const [input, setInput] = useState("");
  
  // Now navigate() becomes a function that changes the URL.
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //AdminJobs.jsx is parent component/and smart also & AdminJobsTable.jsx is a dumb Component
  //check full working of this code how does useEffect works with two combinings like adminJobstable :- jab tum input track ynha kr rhe ho to useEffect bhi toh yahi karoge
  //below this useeffect helps in update store data in redux of SearchJobByText which is used by AdminJobsTable.jsx to reads Redux data.
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);//chech problem in this dependency

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by Name & Role"
            // This creates an event listener which is equivalent to: input.addEventListener("change", callback)
            // jab user type krega toh browser onChange event ko fire krdega , jisse callback trigger hoga aur woh run krdega :- eg :- setInput("google")
            //Ab setInput fn 3(three) things krta hai 1. update internal state 2. mark krdega component ko re-render ke liye 3. react call component again but ye apni state ko reset nahi karta hai so update state ke sath re-render krdeta hai
            onChange={(e) => setInput(e.target.value)}
          />
          {/* So useNavigate() helps us change routes using JavaScript logic. check AdminJobsTable.jsx for better understanding*/}
          <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs;

// Full Flow of filtering Jobs on behalf of input text :- 
            
                        // User types in input
                        //         ↓
                        // AdminJobs state updates
                        //         ↓
                        // useEffect dispatches search text
                        //         ↓
                        // Redux store updates
                        //         ↓
                        // AdminJobsTable reads updated search text
                        //         ↓
                        // Table filters jobs