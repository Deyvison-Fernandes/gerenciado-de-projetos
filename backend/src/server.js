const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

require('./controllers/projetoController')(app);
require('./controllers/tarefaController')(app);


app.listen(5000);

console.log('Server on port', 5000);