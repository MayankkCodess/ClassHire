import { setAllAdminJobs } from '@/redux/jobSlice.js'
import { JOB_API_END_POINT } from '@/utils/constant.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

//Backend :- Routes - job.route.js , controller :- job.controller.js(getAdminJobs) 
//Frontend :- components/admin - AdminJobs.jsx,AdminJobsTable.jsx  , redux - store.js , jobSlice.js

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                //below - .success & .jobs & even error is coming from backend (verify by console.log())
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs

// -----------------useEffect()----------------------------

//--Imp - Component LifeCycle 
// ->      Initialization(when we visit) -> mounting(when screen paints UI) -> updation (state Change) -> unmounting(leaving)

// 1. Problem statement :- mai chahta hu jaise user table component ko visit kre mai data ko fetch krlu , similarly agar update kare toh update kru
// 2. - similarly agar user unmount krta hai toh mai us data ko clear krdu

// So , for doing any task betwween component lifecycle , we use useeffect 


// The useEffect hook in React is a function that allows you to perform side effects in functional components
// >                    4. Types of useEffect

// >             There are 3 important patterns.

// >            Case 1 — Run after every render
//                useEffect(()=>{
//                   console.log("runs after every render")
//                })

// Runs when:

            //   Flow

                // Initial render

                // Render
                // DOM update
                // Paint
                // useEffect runs

                // When button clicked

                // State change
                // Render
                // DOM update
                // Paint
                // useEffect runs again

// >       Case 2 — Run only once (MOST COMMON)
//                useEffect(()=>{
//                   fetchData()
//                },[])

// Empty dependency array means: Run only on first mount

// Example use case:
//                         API calls
//                         fetch user data
//                         fetch products
//                         fetch jobs

// Example:
//                useEffect(()=>{
//                   axios.get("/jobs")
//                },[])


// >      Case 3 — Run when dependency changes
//                   useEffect(()=>{
//                      console.log("count changed")
//                   },[count])

// Runs when: count changes

// Flow:

                // Initial render

                // Render
                // DOM update
                // Paint
                // useEffect runs

                // Click button

                // count changes
                // Render
                // DOM update
                // Paint
                // useEffect runs


//Imp timings :- Step	Approx Time
            
            // Render phase	~0–3 ms
            // DOM update	~1–2 ms
            // Browser paint	~1 ms
            // useEffect execution	right after paint


// 5. Complete Lifecycle Flow


                        // Initial Render
                        //       ↓
                        // Component function runs
                        //       ↓
                        // JSX returned
                        //       ↓
                        // Virtual DOM created
                        //       ↓
                        // DOM updated
                        //       ↓
                        // Browser paints UI
                        //       ↓
                        // useEffect runs

                        // On state change:

                        // State change
                        //       ↓
                        // Component re-renders
                        //       ↓
                        // DOM updates
                        //       ↓
                        // Browser paints
                        //       ↓
                        // useEffect runs again (depending on dependencies)


// 4. Cleanup Function (Very Important)

                    // useEffect can return a cleanup function.

                    // Used for:

                    // removing event listeners

                    // clearing timers

                    // cancelling API requests

                    // Example
                    // useEffect(() => {
                    //   const interval = setInterval(() => {
                    //     console.log("Running");
                    //   }, 1000);

                    //   return () => {
                    //     clearInterval(interval);
                    //   };
                    // }, []);
                    // Flow

                    // Mount

                    // useEffect runs
                    // interval starts

                    // Unmount

                    // cleanup function runs
                    // interval cleared