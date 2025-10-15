import { Router } from "express";
import { addAllSocialMedia, removeAllSocialMedia, removeGithubLink, removeInstagramLink, removeLinkdinLink, sendLink, updateGithubLink, updateInstagramLink, updateLinkdinLink } from "../Controllers/socialMedia.controller.js";

const socialMediaRouter = Router()

socialMediaRouter.route('/sendsocialmedialink').get(sendLink)

socialMediaRouter.route('/addalllink').post(addAllSocialMedia)

socialMediaRouter.route('/removealllink').patch(removeAllSocialMedia)
socialMediaRouter.route('/removeinstagram').patch(removeInstagramLink)
socialMediaRouter.route('/removelinkdin').patch(removeLinkdinLink)
socialMediaRouter.route('/removegithub').patch(removeGithubLink)


socialMediaRouter.route('/updateinstagram').patch(updateInstagramLink)
socialMediaRouter.route('/updatelinkdin').patch(updateLinkdinLink)
socialMediaRouter.route('/updategithub').patch(updateGithubLink)



export {socialMediaRouter}