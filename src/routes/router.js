const express = require("express");
const customerRouter = require("./customerRouter");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("It's working");
});

router.use("/customer", customerRouter);
//Adicionar outras rotas

module.exports = router;
