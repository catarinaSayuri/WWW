const express = require('express');
const router = express.Router();
const AlunasController = require('../controllers/AlunasController');

router.get('/', AlunasController.getAll);
router.get('/:id', AlunasController.getById);
router.post('/create', AlunasController.create);
router.put('/update/:id', AlunasController.update);
router.delete('/delete/:id', AlunasController.delete);

module.exports = router;
