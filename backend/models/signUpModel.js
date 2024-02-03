import mongoose from "mongoose";

const SignUpSchema = mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            requried:true
        },
        password:{
            type:String,
            required:true
        },
        confirmPassword:{
            type:String,
            requried:true
        },
    },
    {
        timestamps: true,
    }
);


export const SignUp = mongoose.model('SignUp', SignUpSchema);
