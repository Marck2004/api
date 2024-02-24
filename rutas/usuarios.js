const express = require("express");
const router = express.Router();
const controller = require("../controladores/usuarios");

router.post("/login",controller.getUsuarios);
router.put("/modifUsuario",controller.modifUsuario);
router.get("/usuarios",controller.devolverUsuarios);
router.post("/añadirUsuario",controller.addUsuario);
router.delete("/usuarios/:nombre",controller.removeUsuario);

module.exports = router;