const express = require("express");
const router = express.Router();
const controller = require("../controladores/frutas");

router.get("/frutas",controller.getFrutas);


module.exports = router;