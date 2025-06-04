// Importa o modelo de Projetos que gerencia as operações no banco de dados
const ProjetosModel = require('../models/ProjetosModel');

// Define um objeto que contém todos os métodos do controlador para gerenciar projetos
const ProjetosController = {
  // Método para listar todos os projetos cadastrados
  // Retorna um array com todos os projetos e o total de registros
  async listar(req, res) {
    try {
      // Busca todos os projetos através do modelo
      const projetos = await ProjetosModel.getAll();
      // Retorna os dados em formato JSON com indicador de sucesso
      res.json({
        success: true,
        data: projetos,
        total: projetos.length
      });
    } catch (error) {
      // Em caso de erro, retorna status 500 e mensagem de erro
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para buscar um projeto específico pelo ID
  // Recebe o ID como parâmetro na URL
  async buscarPorId(req, res) {
    try {
      // Busca o projeto pelo ID fornecido
      const projeto = await ProjetosModel.getById(req.params.id);
      
      // Se não encontrar o projeto, retorna erro 404
      if (!projeto) {
        return res.status(404).json({
          success: false,
          error: 'Projeto não encontrado'
        });
      }

      // Retorna o projeto encontrado
      res.json({
        success: true,
        data: projeto
      });
    } catch (error) {
      // Em caso de erro na busca, retorna status 500
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para criar um novo projeto
  // Recebe os dados do projeto no corpo da requisição
  async criar(req, res) {
    try {
      // Cria um novo projeto usando os dados recebidos
      const novoProjeto = await ProjetosModel.create(req.body);
      // Retorna status 201 (Created) e os dados do novo projeto
      res.status(201).json({
        success: true,
        data: novoProjeto,
        message: 'Projeto criado com sucesso'
      });
    } catch (error) {
      // Em caso de erro na criação, retorna status 500
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para atualizar um projeto existente
  // Recebe o ID na URL e os dados atualizados no corpo da requisição
  async atualizar(req, res) {
    try {
      const id = req.params.id;
      // Tenta atualizar o projeto com os novos dados
      const projetoAtualizado = await ProjetosModel.update(id, req.body);
      
      // Se o projeto não existir, retorna erro 404
      if (!projetoAtualizado) {
        return res.status(404).json({
          success: false,
          error: 'Projeto não encontrado'
        });
      }

      // Retorna os dados atualizados do projeto
      res.json({
        success: true,
        data: projetoAtualizado,
        message: 'Projeto atualizado com sucesso'
      });
    } catch (error) {
      // Em caso de erro na atualização, retorna status 500
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para remover um projeto
  // Recebe o ID do projeto a ser removido na URL
  async deletar(req, res) {
    try {
      const id = req.params.id;
      // Tenta deletar o projeto do banco de dados
      const deletado = await ProjetosModel.delete(id);

      // Se o projeto não existir, retorna erro 404
      if (!deletado) {
        return res.status(404).json({
          success: false,
          error: 'Projeto não encontrado'
        });
      }

      // Retorna mensagem de sucesso após a remoção
      res.json({
        success: true,
        message: 'Projeto removido com sucesso'
      });
    } catch (error) {
      // Em caso de erro na remoção, retorna status 500
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  }
};

// Exporta o controlador para uso em outras partes da aplicação
module.exports = ProjetosController;