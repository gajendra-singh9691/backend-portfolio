import { Router } from "express";
import { aboutParagraphAdd, aboutParagraphLength, sendaboutdata, sendaboutskill, skillAdd } from "../Controllers/aboutSetData.controller.js";
import { removeAboutParagrafh, removeSkill } from "../Controllers/aboutChange.controller.js";

const aboutRouter = Router()

aboutRouter.route('/sendaboutdata').get(sendaboutdata)

aboutRouter.route('/sendaboutskill').get(sendaboutskill)

aboutRouter.route('/setaboutparagraf').post(aboutParagraphAdd)

aboutRouter.route('/setaboutskill').post(skillAdd)

aboutRouter.route('/removeparagraf').post(removeAboutParagrafh)

aboutRouter.route('/removeskill').post(removeSkill)

aboutRouter.route('/totalparagraphlength').get(aboutParagraphLength)

export default aboutRouter