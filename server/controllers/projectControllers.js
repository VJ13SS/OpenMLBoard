import commentModel from "../models/comments.js";
import projectModel from "../models/projects.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel
      .find({ status: "Accepted",visible:true })
      .populate({ path: "createdBy", select: "-password" })

    console.log("Fetching All Accepted Projects");
    return res.json({ success: true, projects:projects.reverse() });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getUserProjects = async (req,res) => {
  try {
    const user_id = req.user._id;
    const userProjects = await projectModel.find({createdBy:user_id}).populate({path:'createdBy',select:'-password'})

    console.log('Fetching the user projects')
    return res.json({success:true,userProjects:userProjects.reverse()})
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message})
  }
}


export const getProjectDetails = async (req,res) => {
  const {projectId} = req.body
  try {
    const project = await projectModel.findById({_id:projectId}).populate({path:'createdBy',select:'-password'})
    const comments = (await commentModel.find({projectId})).reverse()

    const projectDetails = {project,comments}

    console.log('Fetching Project Details')
    return res.json({success:true,projectDetails})
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message})
  }
}

