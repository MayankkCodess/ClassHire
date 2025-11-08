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
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {Popover, PopoverContent} from "../ui/popover.jsx"
import { PopoverTrigger } from "@radix-ui/react-popover";

const CompaniesTable = () => {

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
          <TableCell className="w-fit">
            <Avatar >
              <AvatarImage className="h-8 w-8 object-cover" src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"/>
            </Avatar>
          </TableCell>
          <TableCell>
            Company Name 
          </TableCell>
          <TableCell>
            18-07-2024
          </TableCell>
          <TableCell className="text-right cursor-pointer">
            <Popover>
                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
               <PopoverContent className="w-32">
                  <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <Edit2 className="w-4"/>
                    <span>Edit</span>
                  </div>
               </PopoverContent>
            </Popover>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
