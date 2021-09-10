import React, { useState, useEffect} from 'react';
import { Table, Button, Space, Modal, Switch, PageHeader, message } from 'antd';
import { EditTwoTone, PlusOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import TarefaForm from './TarefaForm';
import { getTarefas, deleteManyTarefa } from '../../services/api';
import "moment/locale/pt-br";
import moment from "moment";

const { confirm } = Modal;

const TarefaGrid = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [listaTarefas, setListaTarefas] = useState([]);
    const [idTarefa, setIdTarefa] = useState(0);
    let tarefasSelecionados = [];
    const [idProjeto] = useState(props.match.params.idProjeto);

    const showModal = () => {
      setIsModalVisible(true);
    };
    
    const handleClose = () => {
      setIsModalVisible(false);
    };

    const handleIncluir = () => {
      setIdTarefa(0);
      showModal();
    };

    const handleEditar = (id) => {
      setIdTarefa(id);
      showModal();
    };

    const handleExcluir = () => {
      if(tarefasSelecionados.length > 0){
        confirm({
          title: 'Excluir registros',
          icon: <ExclamationCircleOutlined />,
          content: 'Realmente deseja excluir os registros selecionados?',
          okText: 'Sim',
          cancelText: 'Não',
          onOk(){
            message.loading({ content: 'Executando ação...', key: 'alertloading' });
            deleteManyTarefa(tarefasSelecionados).then(() => {
              message.success({ content: 'Tarefas excluídas com sucesso', key: 'alertloading' });
              pesquisarTarefa(idProjeto);
            });
          }
        });
      } else {
        message.warning('Selecione pelo menos um registro!');
      }
    };

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        tarefasSelecionados = (selectedRows.map((item) => {
          return item.key;
        }));
      }
    };

    const pesquisarTarefa = (idProjeto) => {
      getTarefas(idProjeto).then(({data}) => {
        const listaDados = data.tarefa.map((item) => {
          const dataInicio = item.dataInicio? moment.utc(item.dataInicio).format("DD/MM/YYYY"): "";
          const dataFim = item.dataFim? moment.utc(item.dataFim).format("DD/MM/YYYY"): "";

          return {
            key: item._id, 
            nome: item.nome, 
            finalizada: item.finalizada, 
            dataInicio, 
            dataFim,
            nomeProjeto: item.projeto.nome
          };
        });
        setListaTarefas(listaDados);
      });
    };

    useEffect(() => {
      pesquisarTarefa(idProjeto);
    }, [idProjeto]);

    const columns = [
      {
        title: 'Nome da tarefa',
        dataIndex: 'nome',
        key: 'nome'
      },
      {
        title: 'Nome do projeto',
        dataIndex: 'nomeProjeto',
        key: 'nomeProjeto'
      },
      {
        title: 'Data início',
        dataIndex: 'dataInicio',
        key: 'dataInicio',
      },
      {
        title: 'Data fim',
        dataIndex: 'dataFim',
        key: 'dataFim',
      },
      {
        title: 'Finalizada',
        dataIndex: 'finalizada',
        key: 'finalizada',
        render: (text, record) => (
            <Switch disabled={true} checked={record.finalizada} />
        )
      },
      {
        title: '',
        key: 'action',
        render: (text, record) => (
          <EditTwoTone className="icon-grid" onClick={() => { handleEditar(record.key); } }/>
        ),
      },
    ];

    return (
        <>
          <PageHeader
            className="page-header-title"
            title="Lista de tarefas"
            subTitle={props.location.nomeProjeto}
            onBack={() => window.history.back()}
          />
          <Space className="space-button-grid">
              <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleIncluir}>
                  Incluir
              </Button>
              <Button type="primary" size="large" danger icon={<CloseOutlined />} onClick={handleExcluir}>
                  Excluir
              </Button>
          </Space>
          <Table rowSelection={{ ...rowSelection }} columns={columns} dataSource={listaTarefas} />

          <Modal title={ `${idTarefa === 0 ? 'Cadastrar': 'Editar'} tarefa` } 
            visible={isModalVisible} footer={null} onCancel={handleClose}
          >
              <TarefaForm idTarefa={idTarefa} idProjeto={idProjeto} callback={() => { pesquisarTarefa(idProjeto) }}/>
          </Modal>
        </>
    );
};
  
export default TarefaGrid;