import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const getProjetos = () => {
    return api.get('projeto');
}

export const getProjeto = (id) => {
    return api.get(`projeto/${id}`);
}

export const postProjeto = (projeto, id) => {
    if(id !== 0){
        return api.put(`projeto/${id}`, projeto);
    } else {
        return api.post('projeto', projeto);
    }
}

export const deleteManyProjetos = (listaIds) => {
    return api.post('projeto/delete-many', listaIds);
}

export const getTarefas = (idProjeto) => {
    if(idProjeto){
        return api.get(`tarefa/tarefas-projeto/${idProjeto}`);
    }
    return api.get('tarefa');
}

export const getTarefa = (id) => {
    return api.get(`tarefa/${id}`);
}

export const postTarefa = (projeto, id) => {
    if(id !== 0){
        return api.put(`tarefa/${id}`, projeto);
    } else {
        return api.post('tarefa', projeto);
    }
}

export const deleteManyTarefa = (listaIds) => {
    return api.post('tarefa/delete-many', listaIds);
}

export default api;