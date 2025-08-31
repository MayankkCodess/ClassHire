import React from "react";
import { Button } from "./ui/button.jsx";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar.jsx";
import {Badge} from "./ui/badge.jsx"
import { useNavigate} from 'react-router-dom'
const Job = () => {
  const navigate= useNavigate();
  const jobId = "lshfdshfldshfls"
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 Days go</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>Company Name</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">
          Responsibilities:-Team Collaboration , Leadership Quality , Good
          Communication Skills , Nice Behaivoural Qualities.
        </p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
             <Badge className={"text-blue-700 font-bold"} variant="secondary">12 Positions</Badge>
             <Badge className={"text-[#F83802] font-bold"} variant="secondary">Part-time</Badge>
             <Badge className={"text-[#7209b7] font-bold"} variant="secondary">24 LPA</Badge>
           </div>
           <div className="flex items-center gap-4 mt-4">
             <Button onClick={()=> navigate(`/description/${jobId}`)} variant="outline">Details</Button>
             <Button className="bg-[#7209b7]">Save For Later</Button>
           </div>
    </div>
  );
};

export default Job;
