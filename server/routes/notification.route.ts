import Express  from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { getNotification, updateNotification } from "../controllers/notification.controller";

const notificationRouter=Express.Router();

notificationRouter.get('/get-allNotifications',isAuthenticated,authorizeRole("admin"),getNotification);
notificationRouter.put('/update-notification/:id',isAuthenticated,authorizeRole("admin"),updateNotification);


export default notificationRouter;
