import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table.jsx'
import { Avatar, AvatarImage } from '../ui/avatar.jsx'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
// here we understand three concepts - 1. .map , 2. .filter , 3. .forEach loop (drawback) but yes agar forEach mai bhi return krwana hai toh ek array type ka variable le sakte ho 
// forEach Loop :- if coding is a array , - const coding = ["js", "ruby" , "java" , "python" , "cpp"] , then if you want to apply forEach loop on it 
// const values = coding.forEach((item) =>{ 
// console.log(item);
//  })
// console.log(values); here it will give you undefined chahe aap kuch bhi krlo 

// problem faced here (picture mai entry hoti hai map,filter ki):- agar hame kuch return karana hai condition lagake array pr , toh haam toh kra hi nahi sakte 
    useEffect(()=>{ 
        console.log('called');
        // Filter :- array mai haam .filter() kr sakte hain ye bhi callback leta hai - usse aap two ways mai likh sakte hain - ()=> () , ()=>{} , nahi toh simple bina return keyword wala
        // const newNums = myNums.filter((num)=>num > 4) //hame condition deni hoti hai job bhi item/element us cond. ko satisfy krta hai , usse .filter hame values return krke bhi deta hai , like isme [5,6,7,8,9.10]
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            };     //check how redux , job&company model , and populate working here ,practice across various logical && and logical ||
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent  posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        // .map property - similarly const newNums = myNumbers.map((num) => {return num+10}); // so here it also takes callback & return simply by iterating on each element and satisfying logic/condition
                        // .map chaining is also another concept - like (myNumbers.map((num)=> num * 10).map((nums)=> num + 1)) //isme automatically phle map wali values pass hojayengi - like agr phle map se value hoti hai 10 then 2nd se wo 11 ho jayegi
                    }
                    { //check useState() working below 
                        filterJobs?.map((job) => (
                            <tr>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable