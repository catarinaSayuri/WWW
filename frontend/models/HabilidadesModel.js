const HabilidadesModel = require('../models/HabilidadesModel');

const HabilidadesController = {
  // List all skills
  async listar(req, res) {
    try {
      const habilidades = await HabilidadesModel.getAll();
      res.json({
        success: true,
        data: habilidades,
        total: habilidades.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Get skill by ID
  async buscarPorId(req, res) {
    try {
      const habilidade = await HabilidadesModel.getById(req.params.id);
      if (!habilidade) {
        return res.status(404).json({
          success: false,
          error: 'Habilidade não encontrada'
        });
      }
      res.json({
        success: true,
        data: habilidade
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Create new skill
  async criar(req, res) {
    try {
      const novaHabilidade = await HabilidadesModel.create(req.body);
      res.status(201).json({
        success: true,
        data: novaHabilidade,
        message: 'Habilidade criada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Update skill
  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const habilidadeAtualizada = await HabilidadesModel.update(id, req.body);
      
      if (!habilidadeAtualizada) {
        return res.status(404).json({
          success: false,
          error: 'Habilidade não encontrada'
        });
      }

      res.json({
        success: true,
        data: habilidadeAtualizada,
        message: 'Habilidade atualizada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Delete skill
  async deletar(req, res) {
    try {
      const id = req.params.id;
      const deletada = await HabilidadesModel.delete(id);

      if (!deletada) {
        return res.status(404).json({
          success: false,
          error: 'Habilidade não encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Habilidade removida com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  }
};

module.exports = HabilidadesController;