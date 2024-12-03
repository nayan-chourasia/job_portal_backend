import mongoose from "mongoose";

// DETERMINING USER SCHEMA

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    phonenumber:{
        type: Number,
        required:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        require:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],//it will be arrays 
        resume:{type:String},//URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},//use to make relation with the company table and store company table id
        profilePhoto:{
            type:String,
            default:""
        }
    },

},{timestamps:true});

// CREATING MODAL
export const User = mongoose.model('User', userSchema)