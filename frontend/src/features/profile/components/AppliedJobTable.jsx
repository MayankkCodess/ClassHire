import React from "react";
import {
  Table,
  TableRow,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table.jsx";
import { Badge } from "../../../components/ui/badge.jsx";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  //check useGetAppliedJobs.jsx custom hook , store , jobSlice , etc for clear understanding
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Table>
        <TableCaption>List of your All Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Job Profile</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Application Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* first checks does allAppliedJobs exists , if true thhen check it length , if condn meet then 1st parathesis execution ()  , if not then 2nd paranthesis */}
          {allAppliedJobs?.length <= 0 ? (
            <span>You haven't applied for any job yet.</span>
          ) : (
            allAppliedJobs?.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                {/* Pbm Statement :- suppose user deleted/remove his application , then for help of react to identify with row to remove from applied jobs , This key above helps React identify each row uniquely when rendering a list. */}
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Badge //we can write the javascript logic inside className also , It dynamically sets background color based on job status , here it's nested ternary.
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob?.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
