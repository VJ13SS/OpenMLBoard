import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    links:{type:[String],required:true},
    status:{type:String,default:'Pending'},
    message:{type:String,default:'We are evaluating your work..!'},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ml_users',
        required:true
    }//creating a reference with user database
})

const projectModel = mongoose.models.ml_project || mongoose.model('ml_project',projectSchema)

export default projectModel