const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");

customerRouter.post("/newCustomer", customerController.newCustomer);
customerRouter.delete("/deleteCustomer/:id", customerController.deleteCustomer);
customerRouter.put("/updateCustomer", customerController.updateCustomer);
customerRouter.get("/listAllCustomers", customerController.listAllCustomers);
customerRouter.post(
  "/searchCustomerByName",
  customerController.searchCustomerByName
);
customerRouter.post(
  "/searchCustomerById",
  customerController.searchCustomerById
);
customerRouter.post(
  "/searchCustomerByCNPJ",
  customerController.searchCustomerByCNPJ
);

module.exports = customerRouter;
