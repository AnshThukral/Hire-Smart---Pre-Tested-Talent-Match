import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "./redux/jobSlice";

const Browse = () => {
  const {allJobs} = useSelector(store=>store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""));
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <p className="text-xl font-bold">
          Search Results ({allJobs.length}){" "}
        </p>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
