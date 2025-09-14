import {addPromo,removePromo,listPromo,checkPromo} from '../controllers/promoController.js';
import express from "express";
const promoRouter=express.Router();

promoRouter.post("/add",addPromo);
promoRouter.get("/list",listPromo);
promoRouter.post("/delete",removePromo);
promoRouter.post("/check",checkPromo);

export default promoRouter;
