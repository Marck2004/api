const express = require("express");
const router = express.Router();
const controller = require("../controladores/frutas");

router.get("/frutas",controller.getFrutas);
router.post("/frutas",controller.addFruta);

module.exports = router;