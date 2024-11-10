import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        Headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Dispatch the action
        navigate("/"); // Redirect on successful login
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      // Safely checking for error.response before accessing it
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <div>
      {/* Keeping Navbar Unaffected */}
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
        {/* Login Form */}
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 mx-4 my-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Access Your Account
          </h1>

          <form className="space-y-6" onSubmit={submitHandler}>
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

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
            >
              Login
            </Button>

            {/* Login Link */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
