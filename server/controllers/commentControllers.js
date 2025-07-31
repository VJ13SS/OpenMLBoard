import commentModel from "../models/comments.js";

export const addNewComment = async (req, res) => {
  const commentDetails = req.body;
  
  try {
    if (commentDetails.type === "edit") {
      await commentModel.findByIdAndUpdate(
        { _id: commentDetails._id },
        { comment: commentDetails.comment }
      );

      console.log("Comment Updated");
      return res.json({ success: true, message: "Comment Updated" });
    }

    const newComment = new commentModel({
      authorId: commentDetails.authorId,
      authorName: commentDetails.authorName,
      comment: commentDetails.comment,
      projectId: commentDetails.projectId,
    });

    await newComment.save();

    console.log("Comment Added");
    return res.json({ success: true, message: "Comment Added" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: true, message: error.message });
  }
};

export const getUserComment = async (req, res) => {
  const { commentId } = req.body;

  try {
    const comment = await commentModel.findById({ _id: commentId });

    if (!comment) {
      return res.json({ success: false, message: "Comment Dosent Exists" });
    }

    console.log("Fetching User Comment");
    return res.json({ success: true, comment });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;
  try {
    const exists = await commentModel.find({ _id: commentId });

    if (!exists) {
      return res.json({ sucess: false, message: "Comment Dosent Exists" });
    }

    await commentModel.findByIdAndDelete({ _id: commentId });

    console.log("Comment Deleted");
    return res.json({ success: true, message: "Comment Updated" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
