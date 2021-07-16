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
  authAssociate,
  associateController.searchAssociateByCnpj
);
associateRouter.put(
  "/updateAssociate",
  authAssociate,
  associateController.updateAssociate
);
associateRouter.delete(
  "/deleteAssociate",
  authAssociate,
  associateController.deleteAssociate
);

associateRouter.get(
  "/getAdministrativeReport",
  associateController.getAdministrativeReport
);

associateRouter.get(
  "/getFinancialReport",
  associateController.getFinancialReport
);

module.exports = associateRouter;
