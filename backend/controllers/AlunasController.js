const AlunasModel = require('../models/AlunasModel'); //requisição para o arquivo models onde há a ponte com o banco de dados referente a tabela Alunas

// Classe responsável por gerenciar todas as operações CRUD (Create, Read, Update, Delete) relacionadas às alunas
class AlunasController {
  // Método para criar uma nova aluna no sistema
  async create(req, res) {
    try {
      // Desestruturação dos dados recebidos no corpo da requisição
      const { nome, nome_exibicao, email, idade, curso, semestre, turma, frase_pessoal, bio } = req.body;

      // Criação de uma nova aluna no banco de dados com os dados fornecidos
      const novaAluna = await AlunasModel.create({
        nome_aluna: nome.trim(), // Remove espaços em branco extras do nome
        nome_exibicao: nome_exibicao,
        email: email.toLowerCase().trim(), // Padroniza o email em lowercase e remove espaços
        idade: idade,
        alunas_curso_check: curso,
        semestre: semestre,
        turma: turma,
        frase_pessoal: frase_pessoal,
        bio: bio
      });

      // Retorna resposta de sucesso com status 201 (Created) e os dados da nova aluna
      res.status(201).json({
        success: true,
        data: novaAluna,
        message: 'Aluna criada com sucesso'
      });

    } catch (error) {
      // Tratamento de erros: retorna status 500 em caso de erro interno
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  }

  // Método para listar todas as alunas cadastradas
  async getAll(req, res) {
    try {
      // Busca todas as alunas no banco de dados
      const alunas = await AlunasModel.getAll();
      
      // Retorna a lista de alunas e o total encontrado
      res.json({
        success: true,
        data: alunas,
        total: alunas.length
      });
    } catch (error) {
      // Tratamento de erros na listagem
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  }

  // Método para buscar uma aluna específica pelo ID
  async getById(req, res) {
    try {
      // Converte o parâmetro ID da URL para número
      const id = parseInt(req.params.id);
      // Busca a aluna no banco de dados
      const aluna = await AlunasModel.getById(id);
      
      // Se a aluna não for encontrada, retorna erro 404
      if (!aluna) {
        return res.status(404).json({
          success: false,
          error: 'Aluna não encontrada'
        });
      }
      
      // Retorna os dados da aluna encontrada
      res.json({
        success: true,
        data: aluna
      });
    } catch (error) {
      // Tratamento de erros na busca
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  }

  // Método para atualizar os dados de uma aluna
  async update(req, res) {
    try {
      // Obtém o ID da aluna a ser atualizada e os novos dados
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      // Tenta atualizar os dados da aluna no banco
      const updatedAluna = await AlunasModel.update(id, updates);
      
      // Se a aluna não existir, retorna erro 404
      if (!updatedAluna) {
        return res.status(404).json({
          success: false,
          error: 'Aluna não encontrada'
        });
      }
      
      // Retorna os dados atualizados da aluna
      res.json({
        success: true,
        data: updatedAluna,
        message: 'Aluna atualizada com sucesso'
      });
    } catch (error) {
      // Tratamento de erros na atualização
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  }

  // Método para remover uma aluna do sistema
  async delete(req, res) {
    try {
      // Obtém o ID da aluna a ser removida
      const id = parseInt(req.params.id);
      // Tenta remover a aluna do banco de dados
      const success = await AlunasModel.delete(id);
      
      // Se a aluna não existir, retorna erro 404
      if (!success) {
        return res.status(404).json({
          success: false,
          error: 'Aluna não encontrada'
        });
      }
      
      // Retorna mensagem de sucesso após a remoção
      res.json({
        success: true,
        message: 'Aluna removida com sucesso'
      });
    } catch (error) {
      // Tratamento de erros na remoção
      res.status(500).json({
        success: false,
        error: error.message || 'Erro interno do servidor'
      });
    }
  }
}

// Exporta uma instância da classe para uso em outras partes da aplicação
module.exports = new AlunasController();