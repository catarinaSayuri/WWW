require('dotenv').config(); // Deve ser a primeira linha

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/alunas', require('./routes/alunasRoutes'));
app.use('/contatos', require('./routes/contatosRoutes'));
app.use('/habilidades', require('./routes/habilidadesRoutes'));
app.use('/projetos', require('./routes/projetosRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar o view engine para EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Rota para página adicionar alunas - renderizando o template EJS
app.get('/adicionarAlunas', (req, res) => {
  res.render('pages/adicionarAlunas'); // só o caminho relativo dentro de views, sem extensão
});

// Rota para página visualizar alunas - renderizando o template EJS
app.get('/visualizarAlunas', (req, res) => {
  res.render('pages/visualizarAlunas');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
