const db = require('../config/database'); //requisição para a conexão com o banco de dados

//Constante que define que armazenará todos os dados das alunas e os exibirá quando for pedido
const AlunasModel = {
  async getAll() {
    const result = await db.query('SELECT * FROM alunas');
    return result.rows;
  },

  // esta função assíncrona permite que os dados da tabela Alunas sejam exibidos com base no id deles 
  async getById(id) {
    const result = await db.query('SELECT * FROM alunas WHERE id_alunas = $1', [id]);
    return result.rows[0];
  },

  // esta função assíncrona permite a criação da tabela Alunas dentro do código com base nas informações do banco de dados
  async create(data) {
    const { nome_aluna, nome_exibicao, email, bio, curso, semestre, imagem_url, frase_pessoal } = data;
    const result = await db.query(`
      INSERT INTO alunas (nome_aluna, nome_exibicao, email, bio, curso, semestre, imagem_url, frase_pessoal)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [nome_aluna, nome_exibicao, email, bio, curso, semestre, imagem_url, frase_pessoal]
    );
    return result.rows[0];
  },

  async update(id, data) {
    const { nome_aluna, nome_exibicao, email, bio, curso, semestre, imagem_url, frase_pessoal } = data;
    const result = await db.query(`
      UPDATE alunas 
      SET nome_aluna = $1, 
          nome_exibicao = $2, 
          email = $3, 
          bio = $4, 
          curso = $5, 
          semestre = $6, 
          imagem_url = $7, 
          frase_pessoal = $8
      WHERE id_alunas = $9
      RETURNING *`,
      [nome_aluna, nome_exibicao, email, bio, curso, semestre, imagem_url, frase_pessoal, id]
    );
    return result.rows[0];
  },

  async delete(id){
    const result = await db.query('DELETE FROM alunas WHERE id_alunas = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = AlunasModel;
