const Libro = require("../models/libroModel");

/**
 * Get all the libros from the database
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getAllLibros = async (req, res) => {
  try {
    // Fetch all libros from the database
    const libros = await Libro.find();
    // Send the libros as a JSON response with status code 200
    res.status(200).json(libros);
  } catch (error) {
    // Handle any errors by sending an error message with status code 500
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

exports.getLibroById = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Libro" });
  }
};

exports.createLibro = async (req, res) => {
  try {
    const nuevoLibro = await Libro.create(req.body);
    await nuevoLibro.save();
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el Libro" });
  }
};

exports.updateLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Libro" });
  }
};

exports.deleteLibro = async (req, res) => {
  try {
    const libroId = req.params.id;

    const libroEliminado = await Libro.findByIdAndRemove(libroId);

    res.status(200).json(libroEliminado);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Libro" });
  }
};
