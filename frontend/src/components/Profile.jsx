import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "CSS", "Javascript", "Reactjs"];
const isResume = true;

const profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);

  const {user} = useSelector(store=>store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl my-5 p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 rounded-full shadow-md">
              <AvatarImage
                src="https://png.pngtree.com/thumb_back/fh260/background/20220625/pngtree-illustration-design-of-compass-logo-template-with-blue-arrow-for-navigationvector-eps-10-photo-image_32047862.jpg"
                alt="Profile"
                className="rounded-full"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user?.fullname}</h1>
              <p className="text-gray-600">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button
            onClick= { () => setOpen(true) }
            className="text-right mt-4 md:mt-0 border border-gray-300 hover:bg-gray-100 transition-colors"
            variant="outline"
          >
            <Pen className="mr-1" />
            Edit Profile
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-blue-500" />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="text-blue-500" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="my-2 font-bold text-lg">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 border border-blue-300 rounded-full cursor-pointer hover:bg-blue-200"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-lg font-bold">Resume</Label>
            {isResume ? (
              <a
                target="blank"
                className="text-blue-500 hover:underline hover:text-blue-600 cursor-pointer transition-colors"
                href={user?.profile?.resume}
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h2 className="font-bold text-lg">Applied Jobs</h2>
        {/* Applied Job Table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default profile;
