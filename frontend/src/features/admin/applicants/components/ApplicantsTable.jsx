import React from "react";
import {
  Table, //ye pure table ko wrap krta hai
  TableBody, // isme pura data aata hai , even tablecell bhi isme hi aata hai
  TableCaption, // ye last mai show hota hai below full table&Data
  TableCell, // isme actual single cell ka data hota hai with optional chaining
  TableHead, // these are just for each heading of table
  TableHeader, // ye wrapper hota hai tablehead ka
  TableRow, // ye bhi tableheader ke aandar hota hai , ki heading column mai rkhni hai ya row mai
} from "@/components/ui/table.jsx";
import {
  Popover, // ye major wrapper hota hai like Table above
  PopoverContent, // isme pura logic like map/div container ,etc
  PopoverTrigger, // means kiske click hone pe popover ko open krana hai - like more horizontal below
} from "@/components/ui/popover.jsx";
import { MoreHorizontal } from "lucide-react"; // three dots
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant.js";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"]; //string type array

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  // Backend Model → Controller → API Response → Redux → UI
  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        // Full Axios Response Object Structure (res) below -
        //         res = {
                //   data: {},          // ✅ MOST IMPORTANT (backend response body)
                //   status: 200,       // HTTP status code
                //   statusText: "OK",  // Status message
                //   headers: {},       // Response headers
                //   config: {},        // Axios config used for request
                //   request: {}        // Raw request object (rarely used)
                // }
                //In this file it might be like - 
                // res = {
                //   data: {
                //     success: true,
                //     message: "Status updated successfully",
                //     application: { ... }
                //   },
                //   status: 200,
                //   headers: { ... },
                //   config: { ... }
                // }
        //real render url below
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      //Axios Error Object Structure - below when request fails
      // error = {
      //   message: "Request failed with status code 400",
      //   response: {
      //     data: {
      //       message: "Invalid status",
      //     },
      //     status: 400,
      //     headers: {},
      //   },
      //   request: {}, // if no response received
      //   config: {},
      // };
      toast.error(error?.response?.data?.message || "Something went Wrong!!");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Applicants for this Position</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="float-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
