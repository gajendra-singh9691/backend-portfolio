import { Router } from "express";
import { sendDataHome, setData } from "../Controllers/homeSetData.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";
import changeImage, { AddSkills, changedetail, changeName, removeSkill } from "../Controllers/homeChange.controller.js";

const homeRouter = Router();
homeRouter.route('/homedata').get(sendDataHome)

homeRouter.route('/setalldata').post(upload.single("image"),setData)
homeRouter.route('/changeimage').post(upload.single("image"),changeImage)
homeRouter.route('/changeName').post(changeName)
homeRouter.route('/addnewskills').post(AddSkills);
homeRouter.route('/changedetail').post(changedetail);
homeRouter.route('/removeskill').post(removeSkill);

export default homeRouter;