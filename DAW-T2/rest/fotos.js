var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

// Controlador para obtener todas las fotos en JSON
router.get('/findAll/json', function(req, res, next) {
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }  // Esto excluye la tabla intermedia
        }]
    })
    .then(fotos => {
        res.json(fotos);
    })
    .catch(error => res.status(400).send(error));
});

// Controlador para obtener una foto por ID en JSON
router.get('/findById/:id/json', function(req, res, next) {
    let id = parseInt(req.params.id);
    Foto.findOne({
        attributes: { exclude: ["updatedAt", "createdAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            id: id
        }
    })
    .then(foto => {
        if (foto) {
            res.json(foto);
        } else {
            res.status(404).send({ message: 'Foto not found' });
        }
    })
    .catch(error => {
        res.status(400).send(error);
    });
});

// Controlador para guardar una nueva foto
router.post('/save', function(req, res, next) {
    let { titulo, descripcion, calificacion, ruta } = req.body;
    Foto.create({
        titulo: titulo,
        descripcion: descripcion,
        calificacion: parseFloat(calificacion),
        ruta: ruta,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(foto => {
        res.json(foto);
    })
    .catch(error => {
        res.status(400).send(error);
    });
});

// Controlador para actualizar una foto existente
router.put('/update', function(req, res, next) {
    let { id, titulo, descripcion, calificacion, ruta } = req.body;
    Foto.update({
        titulo: titulo,
        descripcion: descripcion,
        calificacion: parseFloat(calificacion),
        ruta: ruta,
        updatedAt: new Date()
    },
    {
        where: {
            id: parseInt(id)
        }
    })
    .then(respuesta => {
        res.json(respuesta);
    })
    .catch(error => {
        res.status(400).send(error);
    });
});

// Controlador para eliminar una foto por ID
router.delete('/delete/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    Foto.destroy({
        where: {
            id: id
        }
    })
    .then(respuesta => {
        res.json(respuesta);
    })
    .catch(error => {
        res.status(400).send(error);
    });
});

module.exports = router;
