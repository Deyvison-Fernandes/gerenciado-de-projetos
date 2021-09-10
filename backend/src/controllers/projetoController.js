const express = require('express');
const Projeto = require('../models/projeto');
const router = express.Router();

router.get('/', async (request, response) => {
    try {
        let query = request.query;

        if(query.nome){
            query.nome = { $regex: '.*' + query.nome + '.*' };
        }

        const projeto = await Projeto.find(query).populate('tarefas');
        
        return response.send({projeto});
    } catch(error){
        console.log(error);
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao listar os dados' });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const projeto = await Projeto.findById(id);

        return response.send({projeto});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao consultar o registro' });
    }
});


router.post('/', async (request, response) => {
    try {
        const {nome, dataInicio, dataFim} = request.body;
        const projeto = await Projeto.create({nome, dataInicio, dataFim});
        
        await projeto.save();

        return response.send({projeto});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao inserir o registro' });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const {nome, dataInicio, dataFim} = request.body;

        const projeto = await Projeto.findByIdAndUpdate(id, {
            nome, dataInicio, dataFim
        }, {new: true});

        return response.send({projeto});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao alterar o registro' });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const projeto = await Projeto.findByIdAndRemove(id);

        return response.send({ mensagem: "Registro deletado" });
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao deletar o registro' });
    }
});

router.post('/delete-many', async (req, res) => {
    try {

        const listaIds = req.body;
        if (Array.isArray(listaIds) && listaIds.length > 0) {
            await Projeto.deleteMany({ '_id': { '$in': listaIds } });
        }

        return res.send();

    } catch (ex) {
        return res.status(400).send({ error: true, messageError: 'Ocorreu um erro ao deletar os registros' })
    }
})



module.exports = app => app.use('/projeto', router);