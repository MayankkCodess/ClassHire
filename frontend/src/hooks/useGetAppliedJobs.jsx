import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

// Backend :- application.route.js , application.controller.js(getAppliedJobs) , confused with job & application model so check clearly 
// Frontend :- Profile.jsx , check in AppliedJobTable.jsx { similar question here why used in profile }
//redux :- jobSlice.js , store 

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                // console.log(res.data); // just for checking , is it coming 
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));//you can do applications in backend and then here as well 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;