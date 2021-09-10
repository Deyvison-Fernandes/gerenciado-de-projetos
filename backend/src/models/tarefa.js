const mongoose = require('../config/database');

const TarefaSchema = new mongoose.Schema({
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
    finalizada: {
        type: Boolean,
        require: true,
        default: false
    },
    projeto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projeto',
        require: true
    },
    dataRegistro: {
        type: Date,
        default: Date.now,
    }
});

const Tarefa = mongoose.model('Tarefa', TarefaSchema);
module.exports = Tarefa;