import React from 'react'
import {Table, TableRow,TableCaption,TableHeader,TableHead,TableBody,TableCell} from './ui/table.jsx'
import {Badge} from './ui/badge.jsx'
const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>List of your Applied Jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2,3,4].map((item,index) =>(
                  <TableRow key={index}>
                    <TableCell>17-07-2024</TableCell>
                    <TableCell>Frontend Developer</TableCell>
                    <TableCell>Google</TableCell>
                    <TableCell className="text-right "><Badge variant="outline"className="rounded-b-md bg-purple-700 text-white">Selected</Badge></TableCell>
                  </TableRow>  
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
