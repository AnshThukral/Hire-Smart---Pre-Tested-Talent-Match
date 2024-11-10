import { Job } from "../models/job.model.js";

//Admin posts job
export const postJob = async (req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId=req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        };

        const job=await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company:companyId,
            created_by:userId
        })

        return res.status(201).json({
            message:"New job created successfully",
            job,
            success:true
        });
        
    } catch (error) {
        console.log(error);
    }
}

//Student
export const getAllJobs=async (req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword, $options:"i"}}, //i means no case sensitive issue $regex means findind keyword inside title pattern matching
                {description:{$regex:keyword, $options:"i"}}
            ]
        };
        const jobs=await Job.find(query).populate({
            path:"company"  // the populate method is used to retrieve related documents from other collections. 
        }).sort({createdAt: -1}); // 1 = ascending, -1 = descending

        
        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//Student
export const getJobById = async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"application"   // we can get applicants who applied for this job
        });
        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
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

//Admin kitne job create kra abhi tkk
export const getAdminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs=await Job.find({created_by: adminId}).populate({
            path:'company',
            createdAt: -1
        });

        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}