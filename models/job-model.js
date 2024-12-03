import mongoose from "mongoose";

//SCHEMA FOR JOB PART
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    requirements:[{
        type:String,
        require:true
    }],
    salary:{
        type:String,
        require:true
    },
    experienceLevel:{
        
        type:Number,
        require:true
        
    },
    location:{
        type:String,
        require:true
    },
    jobType:{
        type:String,
        require:true
    },
    position:{
        type:String,
        require:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        require:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
        
    }]
},{timestamps:true});

export const Job = new mongoose.model("Job", jobSchema);