import express from 'express';

import isAuthenticated from '../middlewares/Auth-middleware.js';
import { applyJob, getApplicantsById, getAppliedJobs, updateStatus } from '../controllers/application-controller.js';

const router = express.Router();

router.route("/applyjob/:id").get(isAuthenticated,applyJob)
router.route("/getappliedjob").get(isAuthenticated,getAppliedJobs)
router.route("/:id/getapplicants/").get(isAuthenticated,getApplicantsById)
router.route("/status/:id/update").post(isAuthenticated,updateStatus)
 
export default router;