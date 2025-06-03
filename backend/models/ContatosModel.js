const db = require('../config/database'); //requisição para a conexão com o banco de dados

//Constante que define que armazenará todos os dados de contato das alunas e os exibirá quando for pedido
const ContatosModel = {
  async getAll() {
    const result = await db.query('SELECT * FROM contatos');
    return result.rows;
  },

  // esta função assíncrona permite que os dados da tabela Contatos sejam exibidos com base no id deles 
  async getById(id) {
    const result = await db.query('SELECT * FROM contatos WHERE id_contatos = $1', [id]);
    return result.rows[0];
  },

   // esta função assíncrona permite a criação da tabela Conatos dentro do código com base nas informações do banco de dados
  async create(data) {
    const { id_alunas, tipo, valor } = data;
    const result = await db.query(`
      INSERT INTO contatos (id_alunas, tipo, valor)
      VALUES ($1, $2, $3) RETURNING *`,
      [id_alunas, tipo, valor]
    );
    return result.rows[0];
  },

  async update(id, data) {
    const { tipo, valor } = data;
    const result = await db.query(`
      UPDATE contatos 
      SET tipo = $1, 
          valor = $2
      WHERE id_contatos = $3
      RETURNING *`,
      [tipo, valor, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query(
      'DELETE FROM contatos WHERE id_contatos = $1 RETURNING *', 
      [id]
    );
    return result.rows[0];
  }
};

module.exports = ContatosModel;
