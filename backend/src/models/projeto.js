const mongoose = require('../config/database');

const ProjetoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    dataInicio: {
        type: Date,
        require: true
    },
    dataFim: {
        type: Date,
        require: true
    },
    dataRegistro: {
        type: Date,
        default: Date.now,
    },
    tarefas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tarefa'
    }]
});

const Projeto = mongoose.model('Projeto', ProjetoSchema);
module.exports = Projeto;