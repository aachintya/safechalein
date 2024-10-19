import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"


export const Signup=async (req,res)=>{
    try{
     const {username,email,password} = req.body;
     const user=await User.findOne({email})
     if(user){
        return res.status(400).json({message:"User already exists"})
     }
     const hashPassword=await bcryptjs.hash(password,10)
     const createdUser=new User({
        fullname:fullname,
        email:email,
        password:hashPassword,
     });
     await createdUser.save()
     res.status(201).json({message:"user created successfully",user:{
        _id:createdUser.id,
        username:createdUser.username,
        email:createdUser.email,
     }})
    } catch(error){
        console.log("Error:"+error.message)
        res.status(500).json({message:"server error"})

    }
}
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        const isMatch=await bcryptjs.compare(password,user.password)
        if(!user || !isMatch)
        {
            return res.status(400).json({messsage:"Invalid credentials"});

        }
        else{
            res.status(200).json({message:"Login Successful",user:{
                _id:user.id,
                fullname:user.fullname,
                email:user.email,
            }})
        }
    } catch(error){
      console.log("error",+error.message)
      res.status(500).json({message:"Internal server error"})
    }
        

}