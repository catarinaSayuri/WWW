const AlunasModel = require('../models/AlunasModel');
const multer = require('multer');
const path = require('path');

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Apenas arquivos JPEG ou PNG são permitidos'));
  },
});

class AlunasController {
  async create(req, res) {
     // --- ADICIONE ESTES LOGS ---
    console.log('--- DEBUG: AlunasController.create - NOVO TESTE ---');
    console.log('req.body recebido:', req.body); // O que o frontend enviou no corpo da requisição
    console.log('req.file recebido:', req.file); // Se há um arquivo anexado
    const { nome, nome_exibicao, email, bio, curso, semestre, frase_pessoal } = req.body;
    console.log('Valor de `nome` (desestruturado):', nome, 'Tipo:', typeof nome);
    console.log('Valor de `nome_exibicao` (desestruturado):', nome_exibicao, 'Tipo:', typeof nome_exibicao);
    console.log('Valor de `email` (desestruturado):', email, 'Tipo:', typeof email);
    console.log('Valor de `bio` (desestruturado):', bio, 'Tipo:', typeof bio);
    console.log('Valor de `curso` (desestruturado):', curso, 'Tipo:', typeof curso);
    console.log('Valor de `semestre` (desestruturado):', semestre, 'Tipo:', typeof semestre);
    console.log('Valor de `frase_pessoal` (desestruturado):', frase_pessoal, 'Tipo:', typeof frase_pessoal);
    console.log('----------------------------------------------------');
    // --- FIM DOS LOGS ---
    try {
      const { nome_aluna, nome_exibicao, email, bio, curso, semestre, frase_pessoal } = req.body;
      const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

      const novaAluna = await AlunasModel.create({
        nome_aluna: nome_aluna?.trim(),
        nome_exibicao: nome_exibicao?.trim(),
        email: email?.toLowerCase().trim(),
        bio: bio?.trim(),
        curso: curso?.trim(),
        semestre: semestre?.trim(),
        imagem_url,
        frase_pessoal: frase_pessoal?.trim(),
      });

      res.status(201).json({
        success: true,
        data: { id: novaAluna.id_alunas, ...novaAluna },
        message: 'Aluna criada com sucesso',
      });
    } catch (error) {
      console.error('Erro ao criar aluna:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor',
      });
    }
  }

  async getAll(req, res) {
    try {
      const alunas = await AlunasModel.getAll();
      res.json({
        success: true,
        data: alunas,
        total: alunas.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor',
      });
    }
  }

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const aluna = await AlunasModel.getById(id);
      if (!aluna) {
        return res.status(404).json({
          success: false,
          error: 'Aluna não encontrada',
        });
      }
      res.json({
        success: true,
        data: aluna,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor',
      });
    }
  }

 async update(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'ID inválido' });
    }

    const { nome, nome_exibicao, email, bio, curso, semestre, frase_pessoal } = req.body;
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

    const updates = {
      nome_aluna: nome?.trim(),
      nome_exibicao: nome_exibicao?.trim(),
      email: email?.toLowerCase().trim(),
      bio: bio?.trim(),
      curso: curso?.trim(),
      semestre: semestre?.trim(),
      frase_pessoal: frase_pessoal?.trim(),
    };

    if (imagem_url) {
      updates.imagem_url = imagem_url;
    }

    const updatedAluna = await AlunasModel.update(id, updates);
    if (!updatedAluna) {
      return res.status(404).json({
        success: false,
        error: 'Aluna não encontrada',
      });
    }
    res.json({
      success: true,
      data: updatedAluna,
      message: 'Aluna atualizada com sucesso',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Erro interno do servidor',
    });
  }
}

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const success = await AlunasModel.delete(id);
      if (!success) {
        return res.status(404).json({
          success: false,
          error: 'Aluna não encontrada',
        });
      }
      res.json({
        success: true,
        message: 'Aluna removida com sucesso',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor',
      });
    }
  }
}

module.exports = { controller: new AlunasController(), upload };