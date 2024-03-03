const express = require("express");
const controller = require("../controladores/payment.controller");
const router = express.Router();


router.post("/crear-orden",controller.crearOrden);
router.get("/capturar-orden",controller.capturarOrden);
router.get("/cancelar-orden", controller.cancelarOrden);

module.exports = router;
