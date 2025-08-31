import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button.jsx";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge.jsx";
import { Label } from "./ui/label.jsx";
import AppliedJobTable from "./AppliedJobTable.jsx";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog.jsx";
import { useSelector } from "react-redux";

// const skills = ["HTML", "CSS", "JavaScript", "Reactjs"];
  const isResume = true;

const Profile = () => {
const [open,setOpen] = useState(false);
const {user} = useSelector(store=>store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt=""
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href="https://youtube.com/"
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              Youtube
            </a>
          ) : (
            <span>Not Applicable</span>
          )}
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
          {/* Application Table */}
          <AppliedJobTable/>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
