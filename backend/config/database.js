const { Pool } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
       // console.log('[Database] - Inicializando pool de conexões');
        this.pool = new Pool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
    }

    async query(text, params) {
        console.log('[Database] - Executando query:', text.trim().split('\n')[0]);
        return this.pool.query(text, params);
    }
}

module.exports = new Database();