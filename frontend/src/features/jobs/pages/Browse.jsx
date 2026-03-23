import React, { useEffect } from "react";
import Navbar from "../../../components/shared/Navbar.jsx";
import Job from "../components/Job.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice.js";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";

// works to do here :- 1. Search bar Create krna hai 2. company logo actual aana chahiye 3. props check karo

const Browse = () => {
  //Remember :- frontend ke pass iss custom hook ke last fetch tak ka hi deta hai ,if db mai se job delete ho jati hai , toh bina refresh kare naya data nahi milega ,kyunki jab refresh hoga tabhi useGetAllJob.jsx tumhe fresh data dega
  // What happens on refresh (important) - When you press: F5
  //Entire app reloads: Component mounts again -> useEffect runs again ->API called again
  // So YES: Custom hook runs again on refresh :- But reason is: Component remounts -> NOT because it's outside useEffect.

  useGetAllJobs();
  // it is an array check in jobSlice
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
