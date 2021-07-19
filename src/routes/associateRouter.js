const express = require("express");
const associateRouter = express.Router();
const associateController = require("../controllers/associateController");
const auth = require("../middlewares/auth");
const userAssociate = require("../middlewares/userAssociate");

associateRouter.post("/authentication", associateController.authentication);
associateRouter.post("/newAssociate", associateController.newAssociate);
associateRouter.get(
  "/listAllAssociates",
  associateController.listAllAssociates
);
associateRouter.post(
  "/searchAssociateByCnpj",
  userAssociate,
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
  
  associateController.deleteAssociate
);

associateRouter.get(
  "/getAdministrativeReport",
  userAssociate,
  auth,
  associateController.getAdministrativeReport
);

associateRouter.get(
  "/getFinancialReport",
  userAssociate,
  auth,
  associateController.getFinancialReport
);

associateRouter.get("/logout",userAssociate, auth, associateController.logout);

module.exports = associateRouter;
