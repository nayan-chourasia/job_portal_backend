import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./router/user-route.js"
import companyRoute from "./router/company-route.js"
import jobRoute from "./router/job-router.js"
import applicationRoute from "./router/application-route.js"
import connectDB from "./utils/db.js";
dotenv.config({})




const app = express();
// NOT REQUIRED
// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"Message from the backend",
//         success:true
//     })
// })

//  middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption ={
    origin: '*',
    credentials:true
}
app.use(cors(corsOption));


const PORT = process.env.PORT || 3000;

// API'S
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)
// 3000/api/v1/user/login
// 3000/api/v1/user/register
// 3000/api/v1/user/profile/update

app.listen(PORT, ()=>{
    connectDB();
    console.log(`server running at port : ${PORT}`);
})