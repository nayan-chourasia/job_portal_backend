import express from 'express';

import isAuthenticated from '../middlewares/Auth-middleware.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company-controller.js';
import { singleUpload } from '../middlewares/multer.js';
const router = express.Router();

router.route("/registerCompany").post(isAuthenticated,registerCompany)
router.route("/getCompany").get(isAuthenticated,getCompany)
router.route("/getCompanyById/:id").get(isAuthenticated,getCompanyById)
router.route("/updateCompany/:id").put(isAuthenticated,singleUpload,updateCompany)
 
export default router;