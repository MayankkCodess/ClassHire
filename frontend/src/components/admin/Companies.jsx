import React ,{useEffect,useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import CompaniesTable from "./CompaniesTable.jsx"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import useGetAllCompanies from '@/hooks/useGetAllCompanies.jsx'
import { setSearchCompanyByText } from '@/redux/companySlice.js'

//Similar working of this full component like - AdminJobs.jsx

const Companies = () => {
    // check companySlice - there you will find setCompanies reducer fn which is a Array type
    useGetAllCompanies();

    const [text, setText] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(text));
    },[text]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input value={text} onChange={(e) => setText(e.target.value)} className="w-fit" placeholder="Filter by Company Name" />
          <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
