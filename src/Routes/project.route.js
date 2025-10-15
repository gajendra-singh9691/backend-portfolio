import { Router } from "express";
import { addNewProject, sendprojectDetail } from "../Controllers/projectSetData.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import { projectDemoLinkChange, projectDetailChange, projectGithubLinkChange, projectImageUpdate, projectNameChange, projectRemove, projectUseAdd, projectUseRemove } from "../Controllers/projectChange.controller.js";

const projectRouter = Router();
projectRouter.route('/sendprojectdetail').get(sendprojectDetail)
projectRouter.route('/addproject').post(upload.single("projectImage"),addNewProject)
projectRouter.route('/removeproject/:projectName').delete(projectRemove)
projectRouter.route('/changeprojectimage').patch(upload.single("projectImage"),projectImageUpdate)
projectRouter.route('/changeprojectname').patch(projectNameChange)
projectRouter.route('/changeprojectdetail').patch(projectDetailChange)
projectRouter.route('/changeprojectgithublink').patch(projectGithubLinkChange)
projectRouter.route('/changeprojectdemolink').patch(projectDemoLinkChange)
projectRouter.route('/projectaddnewskill').post(projectUseAdd)
projectRouter.route('/projectremoveskill').post(projectUseRemove)

export {projectRouter}