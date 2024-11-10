import { Job } from "../models/job.model.js";
import { Application } from '../models/application.model.js';

export const applyJob = async(req,res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job Id is required",
                success:false
            })
        };

        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success: false
            });
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });

        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getAppliedJobs=async(req,res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt: -1}).populate({
            path:'job',
            options:{sort:{creadtedAt:-1}},
            populate:{
                path:'company',
                options:{sort:{creadteAt:-1}}
            }
        });

        if(!applicantion){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//admin dekhega kitne user ne apply kiya
export const getApplicants = async (req,res)=>{
    try {
        const jobId = req.params.id; //Job ID
        const job = await Job.findById(jobId).populate({
            path: 'application',
            options:{sort:{creadteAt:-1}},
            populate:{
                path: 'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };

        return res.status(200).json({
            job,
            success:true
        })


    } catch (error) {
        console.log(error);
    }
}


//Accepted or Rejected
export const updateStatus = async(req,res) =>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'satus is required',
                success:false
            })
        };

        //find application by applicantion id
        const application = await Application.findOne({_id: applicationId});
        if(!application){
            return res.status(404).json({
                message:'Application not found.',
                success:false
            })
        }

        //update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:'Stauts updated successfully',
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}