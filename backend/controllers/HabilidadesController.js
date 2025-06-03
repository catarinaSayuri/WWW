// Importa o modelo de Habilidades que gerencia as operações no banco de dados
const HabilidadesModel = require('../models/HabilidadesModel');

// Define um objeto que contém todos os métodos do controlador para gerenciar habilidades
const HabilidadesController = {
  // Método para listar todas as habilidades cadastradas
  // Retorna um array com todas as habilidades e o total de registros
  async listar(req, res) {
    try {
      // Busca todas as habilidades através do modelo
      const habilidades = await HabilidadesModel.getAll();
      // Retorna os dados em formato JSON com indicador de sucesso
      res.json({
        success: true,
        data: habilidades,
        total: habilidades.length
      });
    } catch (error) {
      // Em caso de erro, retorna status 500 e mensagem de erro
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para buscar uma habilidade específica pelo ID
  // Recebe o ID como parâmetro na URL
  async buscarPorId(req, res) {
    // Busca a habilidade pelo ID fornecido
    const habilidade = await HabilidadesModel.getById(req.params.id);
    // Se não encontrar a habilidade, retorna erro 404
    if (!habilidade) return res.status(404).json({ mensagem: 'Habilidade não encontrada' });
    // Retorna a habilidade encontrada
    res.json(habilidade);
  },

  // Método para criar uma nova habilidade
  // Recebe os dados da habilidade no corpo da requisição
  async criar(req, res) {
    try {
      // Cria uma nova habilidade usando os dados recebidos
      const novaHabilidade = await HabilidadesModel.create(req.body);
      // Retorna status 201 (Created) e os dados da nova habilidade
      res.status(201).json({
        success: true,
        data: novaHabilidade,
        message: 'Habilidade criada com sucesso'
      });
    } catch (error) {
      // Em caso de erro, retorna status 500 e mensagem de erro
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para atualizar uma habilidade existente
  // Recebe o ID na URL e os dados atualizados no corpo da requisição
  async atualizar(req, res) {
    try {
      const id = req.params.id;
      // Tenta atualizar a habilidade com os novos dados
      const habilidadeAtualizada = await HabilidadesModel.update(id, req.body);
      
      // Se a habilidade não existir, retorna erro 404
      if (!habilidadeAtualizada) {
        return res.status(404).json({
          success: false,
          error: 'Habilidade não encontrada'
        });
      }

      // Retorna os dados atualizados da habilidade
      res.json({
        success: true,
        data: habilidadeAtualizada,
        message: 'Habilidade atualizada com sucesso'
      });
    } catch (error) {
      // Em caso de erro na atualização, retorna status 500
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para remover uma habilidade
  // Recebe o ID da habilidade a ser removida na URL
  async deletar(req, res) {
    try {
      const id = req.params.id;
      // Tenta deletar a habilidade do banco de dados
      const deletada = await HabilidadesModel.delete(id);

      // Se a habilidade não existir, retorna erro 404
      if (!deletada) {
        return res.status(404).json({
          success: false,
          error: 'Habilidade não encontrada'
        });
      }

      // Retorna mensagem de sucesso após a remoção
      res.json({
        success: true,
        message: 'Habilidade removida com sucesso'
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
module.exports = HabilidadesController;