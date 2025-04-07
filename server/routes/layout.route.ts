import Express  from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";

const layoutRouter=Express.Router();


layoutRouter.post("/create-layout",isAuthenticated,authorizeRole('admin'),createLayout);

layoutRouter.put("/edit-layout",isAuthenticated,authorizeRole('admin'),editLayout);

layoutRouter.get("/get-layout",isAuthenticated,authorizeRole('admin'),getLayoutByType);

export default layoutRouter;

