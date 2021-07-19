const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/motoboyController");
const auth = require("../middlewares/auth");
const userMotoboy = require("../middlewares/userMotoboy");
const userAssociate = require("../middlewares/userAssociate");

motoboyRouter.post("/authentication", motoboyController.authentication);
motoboyRouter.post("/newMotoboy",userAssociate, auth, motoboyController.newMotoboy);
motoboyRouter.delete(
  "/deleteMotoboy/:id",
  userAssociate,
  auth,
  motoboyController.deleteMotoboy
);
motoboyRouter.put("/updateMotoboy",userAssociate, auth, motoboyController.updateMotoboy);
motoboyRouter.get("/listAllMotoboys",userAssociate, auth, motoboyController.listAllMotoboys);
motoboyRouter.post("/searchMotoboyByCpf",userAssociate, auth,motoboyController.searchMotoboyByCpf);

motoboyRouter.get(
  "/getFinancialReportByMotoboy",
  userMotoboy,
  auth,
  motoboyController.getFinancialReportByMotoboy
);

motoboyRouter.get("/logout",userMotoboy, auth, motoboyController.logout);

module.exports = motoboyRouter;
