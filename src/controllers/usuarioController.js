const Usuario = require("../models/usuarioModel");

/**
 * Get all the usuarios from the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getAllUsuarios = async (req, res) => {
  try {
    // Fetch all usuarios from the database
    const usuarios = await Usuario.find();
    // Send the usuarios as a JSON response with status code 200
    res.status(200).json(usuarios);
  } catch (error) {
    // Handle any errors by sending an error message with status code 500
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Usuario" });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el Usuario" });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Usuario" });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuario = await Usuario.findByIdAndDelete(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Usuario" });
  }
};
