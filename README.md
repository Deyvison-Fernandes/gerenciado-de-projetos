<h1 align="center">Sistema para gestão de projetos</h1>

## 🧪 Esse projeto foi desenvolvido com as seguintes tecnologias:

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Ant Design](https://ant.design/)
- [MongoDB](https://www.mongodb.com/)

## 📝 O Sistema

O objetivo desse sistema é fazer a gestão de projetos e suas tarefas, onde são definidas suas datas de inicio e fim para cada tarefa e projeto.
O sistema consiste em 2 CRUDs e exibição de status para cada projeto onde é verificado se a tarefa esta finalizada sendo exibido um percentual de conclusão e validado as datas de fim do projeto e suas tarefa para validar se o termino do projeto será com atraso ou não.

## 💻 Telas do sistema

- Tela de listagem de projetos, onde é possível Incluir, Excluir, Editar e ao clicar no link no nome do projeto é exibida a listagem das tarefas do projeto.
![image](https://user-images.githubusercontent.com/11712951/132796787-a2256c39-9e1c-4cb3-b82a-b103bc58bcec.png)

- Tela para cadastro e edição de projetos]

![image](https://user-images.githubusercontent.com/11712951/132797079-2483b592-e9db-4d6a-8343-9f3bac1e79fd.png)

- Tela de listagem de tarefas, onde é possível Incluir, Excluir e Editar.
![image](https://user-images.githubusercontent.com/11712951/132797140-3226efbb-eaea-4c41-9556-474e79431f9a.png)

- Tela para cadastro e edição de projetos

![image](https://user-images.githubusercontent.com/11712951/132797237-34467f99-8791-4e64-8492-251746060da9.png)


## 🔶 Arquitetura

A imagem abaixo ilustra como o sistema foi arquitetado com as funcionalidades: 
- Projetos;
- Tarefas;
- Indicadores. 

Seus componentes visuais implementados no React que são:
- ProjetoGrid: para exibir a listagem dos projetos;
- ProjetoForm: para exibir o formulário de cadastro do projeto;
- TarefaGrid: para exibir a listagem das tarefas;
- TarefaForm: para exibir o formulário de cadastro da tarefa;
- AndamentoGrid: para exibir uma listagem com as estatísticas dos projetos em uma grid;
- AndamentoCards: para exibir cards para visualização de estatísticas gerais.

E sua API Rest para entrada e saída de dados que estão no banco de dados
![image](https://user-images.githubusercontent.com/11712951/132797614-b1739ecf-004d-43d9-9c4e-2084974c788d.png)


## OBS: A funcionalidade de indicadores foi planejada mas não implementada, será disponibilizada em versões futuras.

## 🚀 Como executar

Com o Docker e o Docker compose instalado, execute os comandos na pasta raiz do projeto:
- Clone o repositório

- Executar o build
`docker-compose build`

- Executar o up
`docker-compose up`

O docker criará a máquina virtual com os seguintes acessos:

Interface Web [http://localhost:3000/](http://localhost:3000/)

API Rest [http://localhost:5000/](http://localhost:5000/)
