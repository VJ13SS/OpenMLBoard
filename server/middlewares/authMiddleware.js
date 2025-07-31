import jwt from 'jsonwebtoken'
import userModel from '../models/user.js'

export const authMiddleware = async (req,res,next) => {
    const token = req.headers.token

    if(!token){
        return res.json({
            success:false,message:'Not Authorised...Login Again'
        })
    }
    try {
        //verify token
        const tokenDecode = jwt.verify(token,process.env.SECRET_KEY)

        req.user = await userModel.findById(tokenDecode.id).select("-password")

        next()//callback function
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}