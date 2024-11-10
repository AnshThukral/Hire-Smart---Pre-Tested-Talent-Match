import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = ({job}) => {
  return (
    <div className="p-8 rounded-2xl shadow-lg bg-white border border-transparent hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      {/* Company Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          {job?.company?.name}
        </h2>
        <p className="text-gray-400 font-medium">India</p>
      </div>

      {/* Job Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{job?.title}</h2>
        <p className="text-gray-500 mt-2">
          {job?.description}
        </p>
      </div>

      {/* Modern Badges */}
      <div className="flex items-center gap-3 mt-6">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
          {job.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
