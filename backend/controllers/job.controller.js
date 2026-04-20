import { Job } from "../models/job.model.js";

//admin post krega job
export const postJob = async(req,res)=>{
    try {
        const{title,description,salary,requirements,location,experience,jobType,position,companyId} = req.body;
        const userId = req.id;
        // console.log(req.body)
        if(!title || !description || !salary || !requirements || !experience || !location || !jobType || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing.",
                success:false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),//array hai
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
        });
        return res.status(201).json({
            message:"New job successfully created.",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Failed to Creating a new Job." ,
            success:false
        })
    }
}
  // Students k Liye ,, check this full fn clearly 
// The controller starts by looking for a query parameter named keyword in the request URL (e.g., /api/jobs?keyword=developer).
// If a keyword is provided, it stores it in the keyword variable.
// If the user doesn't provide a keyword, it defaults to an empty string (""), which essentially means "search for everything."

export const getAllJobs = async (req,res) =>{
    try {
        const keyword = req.query.keyword || "";
// This builds a MongoDB query object using specific operators:

// $or: This operator tells the database to return a document if it matches any of the conditions in the array.

// $regex: This performs a regular expression search, meaning it looks for the keyword as a substring. (e.g., searching "dev" will match "developer").

// $options: "i": This makes the search case-insensitive, so "Developer", "DEVELOPER", and "developer" will all trigger a match.

// Result: The query looks for the keyword in either the job's title OR its description. If the keyword is an empty string, this query will simply match every job in the database.
//        
        const query = {
            $or: [
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
         return res.status(400).json({ 
            message: "Failed to get Jobs" ,
            success:false
        });
    }
}

//basically for students actually 
export const getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
             return res.status(404).json({
                message:"Jobs not found",
                success:false
             })
        };
        return res.status(200).json({
            job,
            success:true
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:"Failed to get job",
            success:false
        });
    }
}

//how much jobs admin had created till now 

//.populate() in mongoose , see full process below this controller

export const getAdminJobs = async(req,res) =>{
    try{
       const adminId = req.id;
       //yaha pr hoga kya ki mongoose , company ki objectId lega job se , aur then query krega company collection ko , aur replace krdega objectId with full company documents 
       const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
       if(!jobs){
        return res.status(404).json({
            message:"Jobs not found",
            success:false
        })
       };
       return res.status(200).json({
        jobs,
        success:true
       })
    }catch(error){
        console.log(error);
        return res.status(400).json({ message: error });
    }
}

// .populate() below 
// What MongoDB Does Internally for populate learn using above controller

//   Step 1 — Query jobs :- SELECT * FROM jobs WHERE created_by = adminId

// Result: [
//         {title:"Backend Dev", company:"101"},
//         {title:"Frontend Dev", company:"102"}
//         ]

//   Step 2 — populate triggers second query :- SELECT * FROM companies WHERE _id IN [101,102]

//   Step 3 — Mongoose merges result

//   Final response:

                    // [
                    // {
                    // title:"Backend Dev",
                    // company:{
                    //     _id:"101",
                    //     name:"Google",
                    //     location:"Bangalore"
                    // }
                    // },
                    // {
                    // title:"Frontend Dev",
                    // company:{
                    //     _id:"102",
                    //     name:"Amazon",
                    //     location:"Hyderabad"
                    // }
                    // }
                    // ]

//  VVV IMP Line :- So populate basically performs a JOIN like SQL.