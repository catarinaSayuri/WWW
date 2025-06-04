const express = require('express');
const router = express.Router();

// MODIFICAÇÃO AQUI: Desestruture para obter a instância do controller e o upload
const { controller: AlunasControllerInstance, upload } = require('../controllers/AlunasController');

// Use a instância do controller para os métodos e o 'upload' para a rota de criação/atualização
router.get('/', AlunasControllerInstance.getAll);
router.get('/:id', AlunasControllerInstance.getById);

// Para rotas com upload de arquivo, você precisa usar o 'upload' do Multer como middleware
router.post('/create', upload.single('imagem_aluna'), AlunasControllerInstance.create); // Use .single('nome_do_campo_do_arquivo')
router.put('/update/:id', upload.single('imagem_aluna'), AlunasControllerInstance.update); // Use .single('nome_do_campo_do_arquivo')

router.delete('/delete/:id', AlunasControllerInstance.delete);

module.exports = router;