const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");
const authAssociate = require("../middlewares/authAssociate");

customerRouter.post("/newCustomer",authAssociate, customerController.newCustomer);
customerRouter.delete("/deleteCustomer/:id",authAssociate, customerController.deleteCustomer);
customerRouter.put("/updateCustomer",authAssociate, customerController.updateCustomer);
customerRouter.get("/listAllCustomers",authAssociate, customerController.listAllCustomers);
customerRouter.post(
  "/searchCustomerByName",authAssociate,
  customerController.searchCustomerByName
);
customerRouter.post(
  "/searchCustomerById",authAssociate,
  customerController.searchCustomerById
);
customerRouter.post(
  "/searchCustomerByCNPJ",authAssociate,
  customerController.searchCustomerByCNPJ
);

module.exports = customerRouter;
