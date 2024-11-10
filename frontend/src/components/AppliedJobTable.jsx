import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((state) => state.job);
  const isLoading = !allAppliedJobs; // Adjust as needed if you're fetching data asynchronously
  
  if (isLoading) {
    return <div>Loading...</div>; // Show loading spinner or text until data is available
  }
  
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-xl my-6 p-4">
      <Table className="min-w-full border-collapse">
        <TableCaption className="text-lg font-semibold py-2">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="py-3 text-left">Date</TableHead>
            <TableHead className="py-3 text-left">Job Role</TableHead>
            <TableHead className="py-3 text-left">Company</TableHead>
            <TableHead className="py-3 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                <TableCell className="py-3 border-t border-gray-200">{appliedJob?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="py-3 border-t border-gray-200">{appliedJob?.job?.title}</TableCell>
                <TableCell className="py-3 border-t border-gray-200">{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="py-3 text-right border-t border-gray-200">
                  <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === "pending" ? 'bg-gray-400': '"bg-green-100 text-green-500 px-3 py-1 rounded-full'}`}>
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
