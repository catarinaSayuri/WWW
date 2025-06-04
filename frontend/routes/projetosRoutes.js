const express = require('express');
const router = express.Router();
const ProjetosController = require('../controllers/ProjetosController'); 

router.get('/', ProjetosController.listar);
router.get('/:id', ProjetosController.buscarPorId);
router.post('/', ProjetosController.criar);
router.put('/:id', ProjetosController.atualizar);
router.delete('/:id', ProjetosController.deletar);

module.exports = router;
