import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
// router.route("/apply/:id").get(isAuthenticated,applyJob);
// Function 1.// Check JobDescription.jsx to get full overview -
export const applyJob = async (req, res) => {
  try {
    // Step 1 - think Models ke according data -
    // Step 2 - check db atlas classhire to get better understanding
    // auth middleware se hai req.id
    const userId = req.id;
    //Express Router automatically parses that segment of the URL and populates the req.params object for you
    const jobId = req.params.id;
    if (!jobId) {
      // if user string does not contains jobId
      return res.status(400).json({
        message: "Job Id is required",
        success: false,
      });
    }
    //check if the user has already applied for this job , check application model to get clarity
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    // check if the jobs exists or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    //create a new application and returns the full document
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to apply for the job.",
      success: false,
    });
  }
};

// router.route("/get").get(isAuthenticated,getAppliedJobs);
// Function 2. for student specific // Hook - useGetAppliedJobs.jsx , Profile Feature fully - Profile.jsx
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    // Populate:- It goes into the Applications collection and finds every application submitted by this specific userId.
    // The Sort: It immediately sorts these application documents from newest to oldest (-1 means descending).
    // then about path: job - What it does: Mongoose looks at the job property inside each Application document. It takes that ObjectId, runs over to the Jobs collection behind the scenes, finds the matching job document, and replaces the ObjectId with the entire Job object (title, description, salary, etc.).
    // then similar to path:company - What it does: This is the deep populate. Now that Mongoose has fetched the full Job document, it looks inside that Job document. It sees that the Job has a company field (which is currently just another ObjectId). Mongoose runs over to the Companies collection, grabs the full company document (name, logo, location), and replaces the ID with the object.
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } }, // latest ones (descending)
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications Found",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to get applied jobs",
      sucess: false
    });
  }
};

// router.route("/:id/applicants").get(isAuthenticated,getApplicants);
//Function 3. Admin ke liye // applicationSlice.js , Applicants.jsx
//admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      // this below only works here because applications are array , but in above controller it don't work
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Failed to get job applicants",
      success: false,
    });
  }
};

// router.route("/status/:id/update").post(isAuthenticated,updateStatus);
// Function 4. Admin ke liye // ApplicantsTable.jsx
export const updateStatus = async (req, res) => {
  // Issue - status update api call kafi bar lag sakti hai toh disable from frontend after one update
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }
    //find the application by applicationId
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }
    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to Update Status",
      success: false
    });
  }
};
