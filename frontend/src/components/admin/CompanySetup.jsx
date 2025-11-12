import React, { useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Button } from "../ui/button.jsx";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler =(e)=>{
    const file = e.target.files?.[0]
    setInput(...input,file)
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    console.log(input);
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form action="" onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 font-semibold text-gray-500"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Label className="p-1">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="p-1">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="p-1">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>  
            <div >
              <Label className="p-1">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div >
              <Label className="p-1">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <Button type="submit" className="mx-auto w-full my-8">Update</Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
