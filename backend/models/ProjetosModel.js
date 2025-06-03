const ProjetosModel = require('../models/ProjetosModel');

const ProjetosController = {
  // List all projects
  async listar(req, res) {
    try {
      const projetos = await ProjetosModel.getAll();
      res.json({
        success: true,
        data: projetos,
        total: projetos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Get project by ID
  async buscarPorId(req, res) {
    try {
      const projeto = await ProjetosModel.getById(req.params.id);
      if (!projeto) {
        return res.status(404).json({
          success: false,
          error: 'Projeto não encontrado'
        });
      }
      res.json({
        success: true,
        data: projeto
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Create new project
  async criar(req, res) {
    try {
      const novoProjeto = await ProjetosModel.create(req.body);
      res.status(201).json({
        success: true,
        data: novoProjeto,
        message: 'Projeto criado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Update project
  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const projetoAtualizado = await ProjetosModel.update(id, req.body);
      
      if (!projetoAtualizado) {
        return res.status(404).json({
          success: false,
          error: 'Projeto não encontrado'
        });
      }

      res.json({
        success: true,
        data: projetoAtualizado,
        message: 'Projeto atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Delete project
  async deletar(req, res) {
    try {
      const id = req.params.id;
      const deletado = await ProjetosModel.delete(id);

      if (!deletado) {
        return res.status(404).json({
          success: false,
          error: 'Projeto não encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Projeto removido com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  }
};

module.exports = ProjetosController;