const express = require("express");
const deliveryRouter = express.Router();
const deliveryController = require("../controllers/deliveryController");
const auth = require("../middlewares/auth");
const userAssociate = require("../middlewares/userAssociate");
const userMotoboy = require("../middlewares/userMotoboy");


deliveryRouter.post("/newDelivery",userAssociate,auth, deliveryController.newDelivery);
deliveryRouter.delete("/deleteDelivery/:id",userAssociate, auth,deliveryController.deleteDelivery);
deliveryRouter.put("/updateDelivery",userMotoboy,auth, deliveryController.updateDelivery);
deliveryRouter.get("/listAllDeliveries",userAssociate,auth, deliveryController.listAllDeliveries);
deliveryRouter.post(
  "/searchDeliveriesByStatus",userMotoboy,auth,
  deliveryController.searchDeliveriesByStatus
);
deliveryRouter.post(
  "/searchDeliveriesByMotoboy",userAssociate,auth,
  deliveryController.searchDeliveriesByMotoboy
);

module.exports = deliveryRouter;
