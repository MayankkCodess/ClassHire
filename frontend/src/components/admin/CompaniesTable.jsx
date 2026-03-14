import React from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "../ui/table";
import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar.jsx";
// import {Popover, PopoverContent} from "../ui/popover.jsx"
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { PopoverTrigger } from "@radix-ui/react-popover";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>A List of your Recent Registered</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
             {filterCompany?.map((company) => (
          <tr
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.5 }}
            key={company._id}>
            <TableCell className="w-fit">
             <div className="h-10 w-10 flex items-center justify-center border rounded-md bg-white">
    <img 
      src={company?.logo} 
      alt={company?.name} 
      className="max-h-8 max-w-[36px] object-contain"
    />
  </div>
            </TableCell>
            <TableCell>{company?.name}</TableCell>
            <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
            <TableCell className="float-right cursor-pointer">
              <Popover>
                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                <PopoverContent className="w-32">
                  <div onClick={() => {
                    navigate(`/admin/companies/${company._id}`);
                  }} className="flex w-fit items-center gap-2 cursor-pointer">
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr>
        ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
