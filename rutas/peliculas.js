const express = require("express");
const router = express.Router();
const controller = require("../controladores/peliculas");

router.get("/peliculas",controller.getPeliculas);
router.post("/peliculas",controller.addPeliculas);
router.delete("/peliculas/:nombre",controller.eliminarPelicula);

module.exports = router;