const express = require('express');
const router = express.Router();
const ContatosController = require('../controllers/ContatosController');

// GET - List all contacts
router.get('/', ContatosController.listar);

// GET - Get contact by ID
router.get('/:id', ContatosController.buscarPorId);

// POST - Create new contact
router.post('/', ContatosController.criar);

// PUT - Update contact
router.put('/:id', ContatosController.atualizar);

// DELETE - Delete contact
router.delete('/:id', ContatosController.deletar);

module.exports = router;