import { Router } from "express";
import { addNewService, sendServiceData } from "../Controllers/serviceSetData.controller.js";
import { addList, changeBestFor, changeNote, changePrice, changeTimeline, removeList, removeService } from "../Controllers/serviceChange.controller.js";

const serviceRouter = Router();

serviceRouter.route('/sendservicedetail').get(sendServiceData)

serviceRouter.route('/addnewservice').post(addNewService)
serviceRouter.route('/removeservice').post(removeService)

serviceRouter.route('/addlistitem').post(addList)
serviceRouter.route('/removelistitem').post(removeList)

serviceRouter.route('/changeserviceprice').patch(changePrice)
serviceRouter.route('/changeservicebestfor').patch(changeBestFor)
serviceRouter.route('/changeservicetimeline').patch(changeTimeline)
serviceRouter.route('/changesservicenote').patch(changeNote)
export {serviceRouter}