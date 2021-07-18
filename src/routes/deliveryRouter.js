const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");

deliveryRouter.post("/newDelivery",auth, deliveryController.newDelivery);
deliveryRouter.delete("/deleteDelivery/:id", deliveryController.deleteDelivery);
deliveryRouter.put("/updateDelivery",auth, deliveryController.updateDelivery);
deliveryRouter.get("/listAllDeliveries",auth, deliveryController.listAllDeliveries);
deliveryRouter.post(
  "/searchDeliveriesByStatus",auth,
  deliveryController.searchDeliveriesByStatus
);
deliveryRouter.post(
  "/searchDeliveriesByMotoboy",auth,
  deliveryController.searchDeliveriesByMotoboy
);

module.exports = deliveryRouter;
