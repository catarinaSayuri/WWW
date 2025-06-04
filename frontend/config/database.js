const { Pool } = require("pg");

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();
console.log('[DEBUG] Senha carregada:', process.env.DB_PASSWORD);
// Determina se deve usar SSL baseado na variável de ambiente
const isSSL = process.env.DB_SSL === "true";

// Cria um pool de conexões com as configurações do banco de dados
const pool = new Pool({
  user: process.env.DB_USER, // Usuário do banco de dados
  host: process.env.DB_HOST, // Host do servidor do banco
  database: process.env.DB_DATABASE, // Nome da base de dados
  password: process.env.DB_PASSWORD, // Senha do usuário
  port: Number(process.env.DB_PORT) || 5432, // Porta de conexão (padrão 5432)
  // Configuração SSL: usa SSL com rejectUnauthorized false se habilitado, senão desabilita SSL
  ssl: isSSL ? { rejectUnauthorized: false } : false,
});

// Exporta os métodos disponíveis para interação com o banco de dados
module.exports = {
  // Método para executar queries SQL com parâmetros opcionais
  query: (text, params) => pool.query(text, params),

  // Método para obter uma conexão específica do pool
  connect: () => pool.connect(),
};
