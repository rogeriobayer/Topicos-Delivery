const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const authAssociate = require("../middlewares/authAssociate");
const auth = require("../middlewares/auth");

deliveryRouter.post("/newDelivery",authAssociate, deliveryController.newDelivery);
deliveryRouter.delete("/deleteDelivery/:id", deliveryController.deleteDelivery);
deliveryRouter.put("/updateDelivery",auth, deliveryController.updateDelivery);
deliveryRouter.get("/listAllDeliveries",authAssociate, deliveryController.listAllDeliveries);
deliveryRouter.post(
  "/searchDeliveriesByStatus",auth,
  deliveryController.searchDeliveriesByStatus
);
deliveryRouter.post(
  "/searchDeliveriesByMotoboy",authAssociate,
  deliveryController.searchDeliveriesByMotoboy
);

module.exports = deliveryRouter;
