import React, { useState, useEffect} from 'react';
import { Table, Button, Space, Modal, PageHeader, message, Tag, Progress } from 'antd';
import { EditTwoTone, PlusOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ProjetoForm from './ProjetoForm';
import { Link } from 'react-router-dom';
import { getProjetos, deleteManyProjetos } from '../../services/api';
import 'moment/locale/pt-br';
import moment from "moment";
import { projetoAtrasado, getPercentualConcluido } from '../../utils/projetoHelper';

const { confirm } = Modal;

const ProjetoGrid = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [listaProjetos, setListaProjetos] = useState([]);
    const [idProjeto, setIdProjeto] = useState(0);
    let projetosSelecionados = [];

    const showModal = () => {
      setIsModalVisible(true);
    };
    
    const handleClose = () => {
      setIsModalVisible(false);
    };

    const handleIncluir = () => {
      setIdProjeto(0);
      showModal();
    };

    const handleEditar = (id) => {
      setIdProjeto(id);
      showModal();
    };

    const handleExcluir = () => {
      if(projetosSelecionados.length > 0){
        confirm({
          title: 'Excluir registros',
          icon: <ExclamationCircleOutlined />,
          content: 'Realmente deseja excluir os registros selecionados?',
          okText: 'Sim',
          cancelText: 'Não',
          onOk(){
            message.loading({ content: 'Executando ação...', key: 'alertloading' });
            deleteManyProjetos(projetosSelecionados).then(() => {
              message.success({ content: 'Projetos excluídos com sucesso', key: 'alertloading' });
              pesquisarProjeto();
            });
          }
        });
      } else {
        message.warning('Selecione pelo menos um registro!');
      }
    };

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        projetosSelecionados = (selectedRows.map((item) => {
          return item.key;
        }));
      }
    };

    const pesquisarProjeto = () => {
      getProjetos().then(({data}) => {
        const listaDados = data.projeto.map((item) => {
          const { nome, dataInicio, dataFim, tarefas} = item;

          return {
            key: item._id, nome, dataInicio, dataFim, tarefas
          };
        });

        setListaProjetos(listaDados);
      });
    };

    useEffect(() => {
      pesquisarProjeto();
    }, []);

    const columns = [
      {
        title: 'Nome do projeto',
        dataIndex: 'nome',
        key: 'nome',
        render: (text, record)  => 
          <Link 
            to={{ 
                pathname: `/tarefas-projeto/${record.key}`, 
                idProjeto: record.key,
                nomeProjeto: record.nome 
              }}
            style={{cursor: 'pointer'}}
          >{text}</Link>,
      },
      {
        title: 'Data início',
        dataIndex: 'dataInicio',
        key: 'dataInicio',
        render: (text, record) => {
          return moment.utc(record.dataInicio).format("DD/MM/YYYY");
        }
      },
      {
        title: 'Data fim',
        dataIndex: 'dataFim',
        key: 'dataFim',
        render: (text, record) => {
          return moment.utc(record.dataFim).format("DD/MM/YYYY");
        }
      },
      {
        title: 'Situação',
        dataIndex: 'situacao',
        key: 'situacao',
        render: (text, record) => {
          var isAtrasado = projetoAtrasado(record);

          return (
            <>
              <Tag color={ isAtrasado ? 'error' : 'success'}>
                { isAtrasado ? 'Término com atraso' : 'Término no prazo'}
              </Tag>
              <div style={{ width: 170 }}>
                <Progress percent={getPercentualConcluido(record)} size="small"/>
              </div>
            </>
          );
        }
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
            title="Lista de projetos"
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
          <Table rowSelection={{ ...rowSelection }} columns={columns} dataSource={listaProjetos} />

          <Modal title={ `${idProjeto === 0 ? 'Cadastrar': 'Editar'} projeto` } visible={isModalVisible} footer={null} onCancel={handleClose}>
              <ProjetoForm idProjeto={idProjeto} callback={() => { pesquisarProjeto() }} />
          </Modal>
        </>
    );
};
  
export default ProjetoGrid;