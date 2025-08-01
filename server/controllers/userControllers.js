import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import validator from "validator";
import projectModel from "../models/projects.js";

//function to create a jwt for each user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

export const registerUser = async (req, res) => {
  const { user_email, user_name, user_password, user_url } = req.body;

  try {
    //checking if user already exists in the database
    const exists = await userModel.findOne({ email: user_email });

    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    //validating user email and password
    if (!validator.isEmail(user_email)) {
      return res.json({
        success: false,
        message: "Email is of invalid format",
      });
    }

    if (user_password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be of minimum 8 characters",
      });
    }

    //encrypting(hashing) user password
    const salt = await bcrypt.genSalt(10); //10 -> rounds of processing the data
    const hashedPassword = await bcrypt.hash(user_password, salt);

    //adding new user to the database
    const newUser = new userModel({
      name: user_name,
      email: user_email,
      password: user_password,
      url: user_url,
    });

    await newUser.save();
    console.log("User created successfully");

    return res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    //validating user email
    if (!validator.isEmail(user_email)) {
      return res.json({
        success: false,
        message: "Email is of invalid format",
      });
    }

    const user = await userModel.findOne({ email: user_email });

    if (!user) {
      return res.json({ success: false, message: "User dosent exists" });
    }

    const isMatch = bcrypt.compare(user_password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Password dosent match" });
    }

    const token = createToken(user._id); //create a token for the user
    const userDetails = { token, user };

    console.log("User LoggedIn");
    return res.json({ success: true, userDetails });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const addNewProject = async (req, res) => {
  const {
    project__name,
    project__description,
    project__link_1,
    project__link_2,
    project__category,
    type,
    original
  } = req.body;

  try {
    const user = req.user;
    const exists = await projectModel.findOne({
      createdBy: user._id,
      name: project__name,
      category: project__category,
      status: "Accepted",
    });

    if (exists) {
      return res.json({
        success: false,
        message: "Project already created by the user",
      });
    }

    if (type === "edit") {
      await projectModel.findOneAndDelete(
        {
          createdBy: user._id,
          name: original.name,
          category: original.category,
        }
      );
    }

    const newProject = new projectModel({
      name: project__name,
      description: project__description,
      category: project__category,
      links: [project__link_1, project__link_2],
      createdBy: user._id,
      status: "Pending",
          message: "We are evaluating your work..!",
    });

    await newProject.save();
    if (type === "edit"){
      console.log("Project Updated Successfully");
      return res.json({
        success: true,
        message: "Project Updated Successfully",
      });
    }
    console.log("Project registered");
    return res.json({ success: true, message: "Project requested for review" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const getAuthorDetails = async (req, res) => {
  const { authorId } = req.body;
  try {
    const exists = await userModel.findById({ _id: authorId });

    if (!exists) {
      return res.json({ success: false, message: "User dosent exists" });
    }
    const authorProjects = await projectModel.find({
      createdBy: authorId,
      status: "Accepted",
      visible:true 
    });
    const authorDetails = { author: exists, projects: authorProjects.reverse() };

    console.log("Fetching Author Details");
    return res.json({ success: true, authorDetails });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { _id, email, name, password, url,description } = req.body;
  try {
    await userModel.findByIdAndUpdate(
      { _id: _id },
      { email, name, password, url,description }
    );

    const updatedProfile = await userModel.findById({_id:_id})
    console.log(updatedProfile)
    console.log("Updated user Details");
    return res.json({ success: true, updatedProfile });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const searchContent = async (req, res) => {
  try {
    const query = req.query.search || "";//getting the query
  const keywords = query.split(/\s+/).map((k) => new RegExp(k, "i"));//extracting the keywords using regular expression

  //getting the project author names(is any) from the search keywords
  const resultsAuthors = await userModel.find({
    $or: [...keywords.map((k) => ({ name: k }))],
  });

  //extracting the author ids
  const authors = resultsAuthors.map((item) => item._id);

  //filtering the projects(based on mongodb operators)
  const results = await projectModel.find({
    $or: [
      ...keywords.map((k) => ({ name: k })),
      ...keywords.map((k) => ({ category: k })),
      { createdBy: { $in: authors } },
    ],
    status: "Accepted",
    visible:true 
  }).populate({path:'createdBy',select:'-password'});

  const projects = results.reverse()

  console.log('Fetching Searched Items')
  return res.json({ success: true, projects });
  } catch (error) {
    console.log(error.message)
    return res.json({success:false,message:error.message})
  }
};

 export const deleteProject = async (req,res) => {
  const {projectId} = req.body
  try {
    const exists = await projectModel.findById({_id:projectId})

    if (!exists) {
      return res.json({success:false,message:'Project Dosent Exists'})
    }

    await projectModel.findByIdAndDelete({_id:projectId})

    console.log('Project Deleted')
    return res.json({success:true,message:'Project Deleted'})
  } catch (error) {
    console.log(error.message)
    return res.json({success:true,message:error.message})
  }
}

export const changeProjectVisibility = async (req,res) => {
  const {projectId,visible} = req.body
  console.log(req.body)
  try {
    const exists = await projectModel.findById({_id:projectId})

    if (!exists) {
      return res.json({success:false,message:'Project Dosent Exists'})
    }

    await projectModel.findByIdAndUpdate({_id:projectId},{visible})
    console.log('Project Status Updated')
    return res.json({success:true,message:'Project Status Updated'})
  } catch (error) {
    console.log(error.message)
    return res.json({success:true,message:error.message})
  }
}
