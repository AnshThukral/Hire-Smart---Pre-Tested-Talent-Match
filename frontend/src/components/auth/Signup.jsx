import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] }); //e.target.files?.[0] accesses the first file in the selected files (if any file is chosen).
    //The ?. (optional chaining operator) is used to prevent errors if no file is selected.
    //If e.target.files is undefined or null, the code won't throw an error; instead,
    //it will simply return undefined.
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //we are sending file also thats why we r using form data
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        Headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      {/* Keeping Navbar Unaffected */}
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
        {/* Signup Form */}
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 mx-4 my-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create Your Account
          </h1>

          <form className="space-y-6" onSubmit={submitHandler}>
            {/* Full Name */}
            <div className="flex flex-col">
              <Label htmlFor="name" className="text-gray-700 mb-2">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Ansh Thukral"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <Label htmlFor="email" className="text-gray-700 mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="anshthukral2504@gmail.com"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <Label htmlFor="phone" className="text-gray-700 mb-2">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="9041610025"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <Label htmlFor="password" className="text-gray-700 mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Radio Group for Student or Recruiter */}
            <div className="mt-4">
              <Label className="text-gray-700 mb-2">Role</Label>
              <RadioGroup className="flex items-center gap-8 mt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="student"
                    id="student"
                    name="role"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer focus:ring-indigo-500 focus:ring-2"
                  />
                  <Label htmlFor="student" className="text-gray-600">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="recruiter"
                    id="recruiter"
                    name="role"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer focus:ring-indigo-500 focus:ring-2"
                  />
                  <Label htmlFor="recruiter" className="text-gray-600">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex flex-col mt-4">
              <Label htmlFor="profile" className="text-gray-700 mb-2">
                Profile Picture
              </Label>
              <Input
                id="profile"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="w-full p-3 border border-gray-300 rounded-md "
              />
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
            >
              Signup
            </Button>

            {/* Login Link */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
