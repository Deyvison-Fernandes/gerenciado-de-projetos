const express = require('express');
const Tarefa = require('../models/tarefa');
const Projeto = require('../models/projeto');
const router = express.Router();

router.get('/', async (request, response) => {
    try {
        let query = request.query;

        if(query.nome){
            query.nome = { $regex: '.*' + query.nome + '.*' };
        }

        const tarefa = await Tarefa.find(query).populate('projeto');
        
        return response.send({tarefa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao listar os dados' });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const tarefa = await Tarefa.findById(id).populate('projeto');

        return response.send({tarefa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao consultar o registro' });
    }
});

router.get('/tarefas-projeto/:idprojeto', async (request, response) => {
    try {
        const idprojeto = request.params.idprojeto;
        const tarefa = await Tarefa.find({projeto: idprojeto}).populate('projeto');

        return response.send({tarefa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao consultar o registro' });
    }
});

router.post('/', async (request, response) => {
    try {
        const {nome, dataInicio, dataFim, finalizada, projeto} = request.body;
        const tarefa = await Tarefa.create({nome, dataInicio, dataFim, finalizada, projeto});

        await tarefa.save();
        
        const projetoModel = await Projeto.findById(projeto);
        projetoModel.tarefas.push(tarefa);
        projetoModel.save();
        
        return response.send({tarefa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao inserir o registro' });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const {nome, dataInicio, dataFim, finalizada, projeto} = request.body;

        const tarefa = await Tarefa.findByIdAndUpdate(id, {
            nome, dataInicio, dataFim, finalizada, projeto
        }, {new: true});

        return response.send({tarefa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao alterar o registro' });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const tarefa = await Tarefa.findByIdAndRemove(id);

        return response.send({ mensagem: "Registro deletado" });
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao deletar o registro' });
    }
});

router.post('/delete-many', async (req, res) => {
    try {

        const listaIds = req.body;
        if (Array.isArray(listaIds) && listaIds.length > 0) {
            await Tarefa.deleteMany({ '_id': { '$in': listaIds } });
        }

        return res.send();

    } catch (ex) {
        return res.status(400).send({ error: true, messageError: 'Ocorreu um erro ao deletar os registros' })
    }
})

module.exports = app => app.use('/tarefa', router);