const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");

deliveryRouter.post("/newDelivery", deliveryController.newDelivery);
deliveryRouter.delete("/deleteDelivery/:id", deliveryController.deleteDelivery);
deliveryRouter.put("/updateDelivery", deliveryController.updateDelivery);
deliveryRouter.get("/listAllDeliveries", deliveryController.listAllDeliveries);
deliveryRouter.post(
  "/searchDeliveriesByStatus",
  deliveryController.searchDeliveriesByStatus
);
deliveryRouter.post(
  "/searchDeliveriesByMotoboy",
  deliveryController.searchDeliveriesByMotoboy
);

module.exports = deliveryRouter;
