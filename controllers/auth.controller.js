import { comparePassword, hashPassword } from "../helpers/auth.helper.js";
import userModel from "../models/user.schema.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        //validations
        console.log(name);
        console.log(req.body);
        if(!name){
            return res.send({error:"Name Required"});
        }
        if(!email){
            return res.send({error:"Email Required"});
        }
        if(!password){
            return res.send({error:"Password Required"});
        }
        //check user
        const existingUser =await userModel.findOne({email});
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message: "User already registered, Please LogIn"
            });
        }

        //register user
        const hashedPassword=await hashPassword(password);
        //save 
        
        
        const user=await new userModel({name,email,password:hashedPassword}).save();
        res.status(201).send({

            success:true,
            message:"User Registered Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            message:"Error in Registration",
        })
    }
}

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;

        //validation

        if(!email| !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            });
        }
        const user= await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message: "Email not registered"
            });
        }
        const match=await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message: "Invalid Password"
            });
        }
        const token=JWT.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:'2d'});
        res.status(200).send({
            success:true,
            message: "Successful Login",
            user:{
                name:user.name,
                email:user.name,
            },
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};

export const profileUpdateController=async (req,res)=>{

};
export const forgotPasswordController=async (req,res)=>{

};
