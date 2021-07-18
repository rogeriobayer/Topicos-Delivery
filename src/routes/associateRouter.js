const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");

associateRouter.post("/authentication", associateController.authentication);
associateRouter.post("/newAssociate", associateController.newAssociate);
associateRouter.get(
  "/listAllAssociates",
  associateController.listAllAssociates
);
associateRouter.post(
  "/searchAssociateByCnpj",
  auth,
  associateController.searchAssociateByCnpj
);
associateRouter.put(
  "/updateAssociate",
  auth,
  associateController.updateAssociate
);
associateRouter.delete(
  "/deleteAssociate",
  auth,
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

associateRouter.get("/logout", auth, associateController.logout);

module.exports = associateRouter;
