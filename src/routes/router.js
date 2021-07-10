const express = require("express");
const customerRouter = require("./customerRouter");
const motoboyRouter = require("./motoboyRouter");
const deliveryRouter = require("./deliveryRouter");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("It's working");
});

router.use("/customer", customerRouter);
router.use("/motoboy",motoboyRouter);
router.use("/delivery",deliveryRouter);
//Adicionar outras rotas

module.exports = router;
