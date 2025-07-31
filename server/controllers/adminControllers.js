import projectModel from "../models/projects.js"

export const reviewProjects = async (req,res) => {
    const {status,message,project_id} = req.body
    try {
        await projectModel.findByIdAndUpdate({_id:project_id},{
            status:status,message:message
        })

        return res.json({success:true,message:'Project Reviewed'})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}


export const getPendingProjects = async (req,res) => {
    try {
        const pendingProjects = await projectModel.find({status:'Pending'}).populate({path:'createdBy',select:'-password'})

        return res.json({success:true,pendingProjects:pendingProjects.reverse()})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}