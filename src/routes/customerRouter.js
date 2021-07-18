const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/customerController");
const auth = require("../middlewares/auth");

customerRouter.post("/newCustomer",auth, customerController.newCustomer);
customerRouter.delete("/deleteCustomer/:id",auth, customerController.deleteCustomer);
customerRouter.put("/updateCustomer",auth, customerController.updateCustomer);
customerRouter.get("/listAllCustomers",auth, customerController.listAllCustomers);
customerRouter.post(
  "/searchCustomerByName",auth,
  customerController.searchCustomerByName
);
customerRouter.post(
  "/searchCustomerById",auth,
  customerController.searchCustomerById
);
customerRouter.post(
  "/searchCustomerByCNPJ",auth,
  customerController.searchCustomerByCNPJ
);

module.exports = customerRouter;
