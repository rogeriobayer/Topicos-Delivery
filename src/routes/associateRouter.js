const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");


associateRouter.post("/authentication", associateController.authentication);
associateRouter.post("/newAssociate", associateController.newAssociate);
associateRouter.get(
  "/listAllAssociates",
  associateController.listAllAssociates
);
associateRouter.post(
  "/searchAssociateByCnpj",
  associateController.searchAssociateByCnpj
);
associateRouter.put("/updateAssociate", associateController.updateAssociate);
associateRouter.delete("/deleteAssociate",associateController.deleteAssociate);

module.exports = associateRouter;
