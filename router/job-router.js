import  express  from "express";
import isAuthenticated from '../middlewares/Auth-middleware.js';
import { getAdminJob, getAllJobs, getJobById, postJob } from "../controllers/job-controller.js";
const router = express.Router();

router.route("/postjob").post(isAuthenticated,postJob)
router.route("/getalljobs").get(isAuthenticated,getAllJobs)
router.route("/getjobbyid/:id").get(isAuthenticated,getJobById)
router.route("/getadminjob").get(isAuthenticated,getAdminJob)
 
export default router;