import { Router } from "express"
import { newInquiry, removeAllInquries, removeInquray, sendData, sendMail } from "../Controllers/contact.controller.js"

const conatctRouter = Router()

conatctRouter.route('/addinquray').post(newInquiry)

conatctRouter.route('/removeinquray').delete(removeInquray)

conatctRouter.route('/removeallinquray').delete(removeAllInquries)

conatctRouter.route('/sendemail').post(sendMail)

conatctRouter.route('/').get(sendData)

export {conatctRouter}