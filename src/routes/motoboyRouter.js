const express = require("express");
const motoboyRouter = express.Router();
const motoboyController = require("../controllers/motoboyController");

motoboyRouter.post("/newMotoboy", motoboyController.newMotoboy);
motoboyRouter.delete("/deleteMotoboy/:id", motoboyController.deleteMotoboy);
motoboyRouter.put("/updateMotoboy", motoboyController.updateMotoboy);
motoboyRouter.get("/listAllMotoboys", motoboyController.listAllMotoboys);
motoboyRouter.post(
  "/searchMotoboyByCpf",
  motoboyController.searchMotoboyByCpf
);

module.exports = motoboyRouter;