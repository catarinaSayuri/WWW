// Importa o modelo de Contatos que gerencia as operações no banco de dados
const ContatosModel = require('../models/ContatosModel');

// Define um objeto que contém todos os métodos do controlador para gerenciar contatos
const ContatosController = {
  // Método para listar todos os contatos cadastrados
  // Retorna um array com todos os contatos e o total de registros
  async listar(req, res) {
    try {
      // Busca todos os contatos através do modelo
      const contatos = await ContatosModel.getAll();
      // Retorna os dados em formato JSON com indicador de sucesso
      res.json({
        success: true,
        data: contatos,
        total: contatos.length
      });
    } catch (error) {
      // Em caso de erro, retorna status 500 e mensagem de erro
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para buscar um contato específico pelo ID
  // Recebe o ID como parâmetro na URL
  async buscarPorId(req, res) {
    // Busca o contato pelo ID fornecido
    const contato = await ContatosModel.getById(req.params.id);
    // Se não encontrar o contato, retorna erro 404
    if (!contato) return res.status(404).json({ mensagem: 'Contato não encontrado' });
    // Retorna o contato encontrado
    res.json(contato);
  },

  // Método para criar um novo contato
  // Recebe os dados do contato no corpo da requisição
  async criar(req, res) {
    try {
      // Cria um novo contato usando os dados recebidos
      const novoContato = await ContatosModel.create(req.body);
      // Retorna status 201 (Created) e os dados do novo contato
      res.status(201).json({
        success: true,
        data: novoContato,
        message: 'Contato criado com sucesso'
      });
    } catch (error) {
      // Em caso de erro, retorna status 500 e mensagem de erro
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para atualizar um contato existente
  // Recebe o ID na URL e os dados atualizados no corpo da requisição
  async atualizar(req, res) {
    try {
      const id = req.params.id;
      // Tenta atualizar o contato com os novos dados
      const contatoAtualizado = await ContatosModel.update(id, req.body);
      
      // Se o contato não existir, retorna erro 404
      if (!contatoAtualizado) {
        return res.status(404).json({
          success: false,
          error: 'Contato não encontrado'
        });
      }

      // Retorna os dados atualizados do contato
      res.json({
        success: true,
        data: contatoAtualizado,
        message: 'Contato atualizado com sucesso'
      });
    } catch (error) {
      // Em caso de erro na atualização, retorna status 500
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  },

  // Método para remover um contato
  // Recebe o ID do contato a ser removido na URL
  async deletar(req, res) {
    try {
      const id = req.params.id;
      // Tenta deletar o contato do banco de dados
      const deletado = await ContatosModel.delete(id);

      // Se o contato não existir, retorna erro 404
      if (!deletado) {
        return res.status(404).json({
          success: false,
          error: 'Contato não encontrado'
        });
      }

      // Retorna mensagem de sucesso após a remoção
      res.json({
        success: true,
        message: 'Contato removido com sucesso'
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
module.exports = ContatosController;