const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");
const auth = require("../middlewares/auth");
const userAssociate = require("../middlewares/userAssociate");

customerRouter.post("/newCustomer",userAssociate,auth, customerController.newCustomer);
customerRouter.delete("/deleteCustomer/:id",userAssociate,auth, customerController.deleteCustomer);
customerRouter.put("/updateCustomer",userAssociate,auth, customerController.updateCustomer);
customerRouter.get("/listAllCustomers",userAssociate,auth, customerController.listAllCustomers);
customerRouter.post(
  "/searchCustomerByName",userAssociate, auth,
  customerController.searchCustomerByName
);
customerRouter.post(
  "/searchCustomerById",userAssociate, auth,
  customerController.searchCustomerById
);
customerRouter.post(
  "/searchCustomerByCNPJ",userAssociate, auth,
  customerController.searchCustomerByCNPJ
);

module.exports = customerRouter;
