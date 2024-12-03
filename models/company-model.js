import mongoose from "mongoose";

// COMPANY MODEL SCHEMA

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
},{timestamps:true})

export const Company = new mongoose.model("Company",companySchema);