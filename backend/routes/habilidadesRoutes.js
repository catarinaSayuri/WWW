const express = require('express');
const router = express.Router();
const HabilidadesController = require('../controllers/HabilidadesController');

router.get('/', HabilidadesController.listar);
router.get('/:id', HabilidadesController.buscarPorId);
router.post('/', HabilidadesController.criar);
router.put('/:id', HabilidadesController.atualizar);
router.delete('/:id', HabilidadesController.deletar);

module.exports = router;