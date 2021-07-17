const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/motoboyController");
const authAssociate = require("../middlewares/authAssociate");

motoboyRouter.post("/authentication", motoboyController.authentication);
motoboyRouter.post("/newMotoboy", authAssociate, motoboyController.newMotoboy);
motoboyRouter.delete(
  "/deleteMotoboy/:id",
  authAssociate,
  motoboyController.deleteMotoboy
);
motoboyRouter.put("/updateMotoboy", authAssociate, motoboyController.updateMotoboy);
motoboyRouter.get("/listAllMotoboys", authAssociate, motoboyController.listAllMotoboys);
motoboyRouter.post("/searchMotoboyByCpf", motoboyController.searchMotoboyByCpf);

motoboyRouter.get(
  "/getFinancialReportByMotoboy",
  motoboyController.getFinancialReportByMotoboy
);

module.exports = motoboyRouter;
