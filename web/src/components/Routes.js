import React from "react";
import { Route } from "react-router-dom";

import ProjetoGrid from "./Projetos/ProjetoGrid";
import TarefaGrid from "./Tarefas/TarefaGrid";

const Routes = () => {
   return(
       <>
           <Route component = { ProjetoGrid }  path="/projetos" exact />
           <Route component = { TarefaGrid }  path="/tarefas" />
           <Route component = { TarefaGrid }  path="/tarefas-projeto/:idProjeto" />
       </>
   )
}

export default Routes;