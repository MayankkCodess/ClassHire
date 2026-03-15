import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { setAllJobs } from '../redux/jobSlice';

//Important Point Notices - check why we use this useGetAllJobs.jsx in Home.jsx & Browse.jsx only why not in LatestJobs.jsx , LatestJobCards.jsx ,Jobs.jsx , Job.jsx

//Backend :- job.route.js , job.controller.js(getAllJobs) , .populate , req.query , check in db 
//Frontend :- Home.jsx , check in LatestJobs.jsx , LatestJobCards.jsx , props(React) , .map(js) , check - Jobs.jsx also ,then Job.jsx also 
//redux :- jobSlice.js(allJobs , setAllJobs ) , and store in redux 

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    useEffect(() =>{
        const fetchAllJobs = async () =>{
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[]);
}

export default useGetAllJobs;
