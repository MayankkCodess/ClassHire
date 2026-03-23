import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button.jsx";
import { Badge } from "../../../components/ui/badge.jsx";
import Navbar from "../../../components/shared/Navbar.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../../../utils/constant.js";
import { setSingleJob } from "../../../redux/jobSlice.js";
//useSelector:- this hook allow you to extract data or the state from the redux from the redux store using selector function(returns the data)
//so jo bhi data tumhe store se chahiye ye return krdeta hai, for that you have already used provider in main.jsx
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

//(useDispatch) Problem statement :- l we want like , we have added a task and now we want that to go in store.js(imp) and store in that particular slice
// for soln of above pbm - we need to create a action (add task) and then it will go to reducer function and it will add that new task , so we call it dispatching an action
//useDispatch :- the useDispatch hook allow you to send or dispatch an action to the redux store by giving the action as an argument to the dispatch variable.
// we store useDispatch() fun in a variable named dispatch and then pass an action object in that dispatch variable.

<Navbar />;
const JobDescription = () => {
  // below we are returning job(jobSlice) from store , because we have access to store due to useselector
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  //This logic below
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (applications) => applications.applicant === user?._id,
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsApplied(true); //update button when applied
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        // before dispatching :- clear about 1. konsa reducer fn call hoga ,2. konse action pr woh reducer fn call hoga
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        // console.log(res)
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id,
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-20 border p-5 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-[#384B70] font-bold"} variant="secondary">
                {singleJob?.position} Positions
              </Badge>
              <Badge className={"text-[#384B70] font-bold"} variant="secondary">
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-[#384B70] font-bold"} variant="secondary">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded=lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#384B70] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-200 font-medium py-4">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experience} Years
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
