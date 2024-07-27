var express = require('express');
var router = express.Router();
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;
const { Op } = require('sequelize');

// Ruta para obtener todas las fotos en formato JSON
router.get('/findAll/json', async function(req, res, next) {
  try {
    const fotos = await Foto.findAll({
      attributes: { exclude: ["updatedAt"] },
      include: [{
        model: Etiqueta,
        as: 'etiquetas',
        attributes: ['texto'],
        through: { attributes: [] }
      }]
    });
    res.json(fotos);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para obtener todas las fotos en formato vista
router.get('/findAll/view', async function(req, res, next) {
  try {
    const fotos = await Foto.findAll({
      attributes: { exclude: ["updatedAt"] },
      include: [{
        model: Etiqueta,
        as: 'etiquetas',
        attributes: ['texto'],
        through: { attributes: [] }
      }]
    });
    res.render('fotos', { title: 'Fotos', arrFotos: fotos });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para guardar una nueva foto
router.post('/save', async function(req, res, next) {
  let { titulo, descripcion, calificacion, ruta } = req.body;
  try {
    const foto = await Foto.create({
      titulo: titulo,
      descripcion: descripcion,
      calificacion: parseFloat(calificacion),
      ruta: ruta,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.json(foto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Otras rutas...
router.put('/update', async function(req, res, next) {
  let { id, titulo, descripcion, calificacion, ruta } = req.body;
  try {
    const foto = await Foto.update({
      titulo: titulo,
      descripcion: descripcion,
      calificacion: parseFloat(calificacion),
      ruta: ruta,
      updatedAt: new Date()
    }, {
      where: {
        id: parseInt(id)
      }
    });
    res.json(foto);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/delete/:id', async function(req, res, next) {
  let id = parseInt(req.params.id);
  try {
    const respuesta = await Foto.destroy({
      where: {
        id: id
      }
    });
    res.json(respuesta);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
