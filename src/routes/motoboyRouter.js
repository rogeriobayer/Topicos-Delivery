const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/motoboyController");
const auth = require("../middlewares/auth");

motoboyRouter.post("/authentication", motoboyController.authentication);
motoboyRouter.post("/newMotoboy", auth, motoboyController.newMotoboy);
motoboyRouter.delete(
  "/deleteMotoboy/:id",
  auth,
  motoboyController.deleteMotoboy
);
motoboyRouter.put("/updateMotoboy", auth, motoboyController.updateMotoboy);
motoboyRouter.get("/listAllMotoboys", auth, motoboyController.listAllMotoboys);
motoboyRouter.post("/searchMotoboyByCpf", motoboyController.searchMotoboyByCpf);

motoboyRouter.get(
  "/getFinancialReportByMotoboy",
  motoboyController.getFinancialReportByMotoboy
);

module.exports = motoboyRouter;
