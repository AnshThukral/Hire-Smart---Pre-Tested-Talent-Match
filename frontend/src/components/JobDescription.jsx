import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "./redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  console.log(singleJob);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.application?.some(
      (applications) => applications.applicant === user?._id
    ) || false; //some gives u true or false

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);


  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true}
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true); //update the local state
        const updateSingleJob = {...singleJob, application:[...singleJob.application,{applicant:user?._id}]};
        dispatch(setSingleJob(updateSingleJob)); //help us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        // console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.application.some(applications=>applications.applicant === user?._id)) // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl text-gray-900">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <Badge
              className="text-blue-700 font-bold py-1 px-3 rounded-md"
              variant="ghost"
            >
              {singleJob?.position} Positions
            </Badge>
            <Badge
              className="text-[#F83002] font-bold py-1 px-3 rounded-md"
              variant="ghost"
            >
              {singleJob?.jobType}
            </Badge>
            <Badge
              className="text-[#7209b7] font-bold py-1 px-3 rounded-md"
              variant="ghost"
            >
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg transition-colors duration-300 ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed text-gray-300"
              : "bg-[#7209b7] text-white hover:bg-[#5f32ad]"
          } py-2 px-6`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h2 className="border-b-2 border-gray-300 font-semibold text-lg py-4 mt-6">
        Job Description
      </h2>
      <div className="my-4">
        <h2 className="font-bold my-2 text-gray-700">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h2>
        <h2 className="font-bold my-2 text-gray-700">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h2>
        <h2 className="font-bold my-2 text-gray-700">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h2>
        <h2 className="font-bold my-2 text-gray-700">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </h2>
        <h2 className="font-bold my-2 text-gray-700">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h2>
        <h2 className="font-bold my-2 text-gray-700">
          Total Applications:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.application?.length}
          </span>
        </h2>
        <h2 className="font-bold my-2 text-gray-700">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default JobDescription;
