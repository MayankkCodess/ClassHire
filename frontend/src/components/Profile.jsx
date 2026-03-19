import React from "react";
import Navbar from "./shared/Navbar.jsx";
import { Avatar, AvatarImage } from "./ui/avatar.jsx";
import { Button } from "./ui/button.jsx";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import { Label } from "./ui/label.jsx";
//check AppliedJobTable.jsx also 
import AppliedJobTable from "./AppliedJobTable.jsx";
//check UpdateProfileDialog.jsx also 
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
//useGetAppliedJobs.jsx is used to get data from the 
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs.jsx";

// const skills = ["HTML", "CSS", "JavaScript", "Reactjs"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="border bg-white border-gray-200 rounded-2xl my-5 p-8">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto} alt="" />
              </Avatar>
              <div>
                <h1 className="font-medium text-xl">{user?.fullname}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
            </div>
            <Button onClick={() => setOpen(true)}>
              <Pen />
            </Button>
          </div>
          <div className="my-5 mx-5">
            <div className="flex items-center gap-3 my-2">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>
          <div className="mx-5">
            <h1 className="font-semibold text-xl my-3">{user?.skills}</h1>
            <div className="flex items-center gap-2">
              {user?.profile?.skills.length != 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge variant="outline" key={index}>
                    {item}
                  </Badge>
                ))
              ) : (
                <span>Not Applicable</span>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mx-5">
            <Label className="text-md font-bold">Resume</Label>
            {isResume ? (
              <a
                target="blank"
                href={user?.profile?.resume}
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>Not Applicable</span>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl my-5 p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="font-bold text-lg my-2 mx-2">Applied Jobs</h1>
            {/* Application Table */}
            <AppliedJobTable />
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
