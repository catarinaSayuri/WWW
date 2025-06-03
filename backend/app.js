const express = require('express');
const app = express();
const port = 3000

app.use(express.json());
app.use('/alunas', require('./routes/alunasRoutes'));
app.use('/contatos', require('./routes/contatosRoutes'));
app.use('/habilidades', require('./routes/habilidadesRoutes'));
app.use('/projetos', require('./routes/projetosRoutes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
