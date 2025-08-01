import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    description:{type:String,default:'Hey All..Lets Stay Connected'},
    url:{type:String,required:true}
})

const userModel = mongoose.models.ml_users || mongoose.model('ml_users',userSchema)

export default userModel