const express = require("express");
const router = express.Router();

const { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario} = require("../controllers/usuarioController");

const { requiredScopes } = require("express-oauth2-jwt-bearer");

router.get("/", requiredScopes("read:usuarios"), getAllUsuarios);             // Ruta para obtener todos los usuarios

router.get("/:id", requiredScopes("read:usuarios"), getUsuarioById);           // Ruta para obtener un usuario por id

router.post("/", requiredScopes("write:usuarios"), createUsuario);             // Ruta para crear un nuevo usuario  

router.put("/:id", requiredScopes("write:usuarios"), updateUsuario);           // Ruta para actualizar un usuario existente

router.delete("/:id", requiredScopes("write:usuarios"), deleteUsuario);        // Ruta para eliminar un usuario

module.exports = router