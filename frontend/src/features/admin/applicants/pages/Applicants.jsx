import React, { useEffect } from "react";
import Navbar from "@/components/shared/Navbar.jsx";
import ApplicantsTable from "../components/ApplicantsTable.jsx";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice.js";
import { toast } from "sonner";
import { Users } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        //You can write this also :- axios.defaults.withCredentials = true;
        //Below Add render link after deploying
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message); // check it completely by debugging
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.applications.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
