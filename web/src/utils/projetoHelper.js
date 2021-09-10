
export const projetoAtrasado = (projeto) => {
    const{tarefas} = projeto;

    if(tarefas.length > 0){
        const tarefa = tarefas.sort((a, b) => {
            return (a.dataFim < b.dataFim) ? 1 : -1;
        })[0];

        return tarefa.dataFim > projeto.dataFim;
    }

    return new Date() > projeto.dataFim;
};

export const projetoFinalizado = (projeto) => {
    return !projeto.tarefas.some(tarefa => !tarefa.finalizada);
}

export const getPercentualConcluido = (projeto) => {
    if(projeto.tarefas.length > 0){
        var tarefasFinalizadas = projeto.tarefas.filter(tarefa => {
            return tarefa.finalizada;
        }).length;

        return (tarefasFinalizadas * 100 / projeto.tarefas.length).toFixed(2);
    }

    return 0;
}