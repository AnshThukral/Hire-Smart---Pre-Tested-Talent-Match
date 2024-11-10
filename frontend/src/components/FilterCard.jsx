import React from "react";
import { RadioGroup } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    Array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    Array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Banking Sector",
    ],
  },
  {
    filterType: "Salary",
    Array: ["0-40k", "42-1Lakh", "1Lakh to 5Lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-md">
      <h2 className="text-xl font-bold text-gray-800">Filter Jobs</h2>
      <hr className="mt-2 mb-4 border-gray-300" />

      <RadioGroup>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              {data.filterType}
            </h3>
            {data.Array.map((item, index) => {
              return (
                <div key={index} className="flex items-center space-x-3 my-1">
                  <input
                    type="radio"
                    value={item}
                    name={data.filterType}
                    className="cursor-pointer focus:ring-black checked:bg-black rounded-full m-1"
                    style={{ accentColor: "black" }}
                  />
                  <Label className="text-gray-600 cursor-pointer mb-0.5">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
