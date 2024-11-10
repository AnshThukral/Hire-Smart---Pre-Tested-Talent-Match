import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice"; // Import setUser action
import { USER_API_END_POINT } from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage when Navbar mounts
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  const logoutHandler = async () => {
    try {
      // Make API request to logout the user
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true, // Ensure cookies are sent with request
      });

      if (res.data.success) {
        // Clear the user from Redux state
        dispatch(setUser(null));

        // Clear the user data from localStorage
        localStorage.removeItem("user");

        // Navigate to the home page
        navigate("/");

        // Show success message
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      // Handle error and show message
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Hire <span className="text-[#F83002]">Smart</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <a
                    href="/admin/companies"
                    className="text-black hover:text-[#F84002] cursor-pointer transition-colors duration-300"
                  >
                    Companies
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/jobs"
                    className="text-black hover:text-[#F84002] cursor-pointer transition-colors duration-300"
                  >
                    Jobs
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/"
                    className="text-black hover:text-[#F84002] cursor-pointer transition-colors duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/jobs"
                    className="text-black hover:text-[#F84002] cursor-pointer transition-colors duration-300"
                  >
                    Jobs
                  </a>
                </li>
                <li>
                  <a
                    href="/browse"
                    className="text-black hover:text-[#F84002] cursor-pointer transition-colors duration-300"
                  >
                    Browse
                  </a>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="hover:bg-[#262826] hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#d53838] hover:bg-[#9b3838]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    className="w-11 rounded-md cursor-pointer"
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <div>
                <PopoverContent className="w-80 shadow-md rounded-md bg-white">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        className="w-11 rounded-md cursor-pointer mt-3 ml-2"
                        src={user?.profile?.profilePhoto}
                        alt="profile"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium mt-2">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 mx-3 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button
                          variant="link"
                          className="border-none font-bold bg-white size-3"
                          style={{ width: "8rem" }}
                        >
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button
                        variant="link"
                        className="border-none font-bold bg-white"
                        style={{ width: "8rem" }}
                        onClick={logoutHandler}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </div>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
