import React from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "../ui/table.jsx";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
    //In JavaScript, && does not return true/false always , here It returns one of the operands. means if companies exists only then it will run .filter(); 
    //Meaning: If A is falsy → return A , If A is truthy → return B , So && acts like a guard operator.
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
        <TableCaption>A List of your Recently Registered Companies</TableCaption>
        <TableHeader className="rounded-3xl  bg-[#384B70]">
          <TableRow>
            <TableHead className="text-[#F0F2F4]">Logo</TableHead>
            <TableHead className="text-[#F0F2F4]">Name</TableHead>
            <TableHead className="text-[#F0F2F4]">Date</TableHead>
            <TableHead className="text-right text-[#F0F2F4]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
             {filterCompany?.map((company) => (
          <tr
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.5 }}
            // React requires a unique key when rendering lists , Because React needs to know: "Which item changed, which item stayed same, which item got deleted."
            key={company._id}>
            <TableCell className="w-fit">
             {/* <div className="h-10 w-10 flex items-center justify-center border rounded-md bg-white"> */}
             <div className="h-12 w-16 flex items-center justify-center border rounded-md bg-white overflow-hidden p-1">
              <img 
                src={company?.logo} 
                alt={company?.name} 
                // className="max-h-8 max-w-[36px] object-contain"
                className="h-full w-full object-contain"
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
