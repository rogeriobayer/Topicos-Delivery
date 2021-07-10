const express = require("express");
const deliveyRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");

deliveyRouter.post("/newDelivery", deliveryController.newDelivery);
// deliveyRouter.delete("/deleteDelivery/:id", deliveryController.deleteDelivery);
// deliveyRouter.put("/updateDelivery", deliveryController.updateDelivery);
deliveyRouter.get("/listAllDeliveries", deliveryController.listAllDeliveries);
deliveyRouter.post(
    "/searchDeliveriesByStatus",
    deliveryController.searchDeliveriesByStatus
);
deliveyRouter.post(
    "/searchDeliveriesByMotoboy",
    deliveryController.searchDeliveriesByMotoboy
);

module.exports = deliveyRouter;