import React, { useState, useEffect} from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  ConfigProvider,
  Switch,
  Select,
  message
} from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import locale from 'antd/lib/locale/pt_BR';
import { getTarefa, postTarefa, getProjetos } from '../../services/api';

const { RangePicker } = DatePicker;
const { Option } = Select;

const TarefaForm = (props) => {
  const TarefaModel = () => {
    return {
      nome: "",
      dataInicio: null,
      dataFim: null,
      finalizada: false,
      projeto: ""
    }
  };

  const [tarefa, setTarefa] = useState({});
  const [listaProjetos, setListaProjetos] = useState([]);
  const idTarefa = props.idTarefa;

  const onFinish = (values) => {
    const nome = values['nome'];
    const finalizada = values['finalizada'];
    const projeto = values['projeto'];
    const dataInicio = values['periodo'][0].format('YYYY-MM-DD');
    const dataFim = values['periodo'][1].format('YYYY-MM-DD');
    const tarefaForm = {
      nome, dataInicio, dataFim, finalizada, projeto
    };

    message.loading({ content: 'Executando ação...', key: 'alertloading' });
    postTarefa(tarefaForm, idTarefa).then(() => {
      message.success({ content: 'Tarefa salva com sucesso', key: 'alertloading' });
      props.callback();
      
      if(!idTarefa){
        setTarefa({projeto});
      }else{
        setTarefa(tarefaForm);
      }
    });
  };

  useEffect(() => {

    getProjetos().then(({data}) => {
      setListaProjetos(data.projeto);
    });

    if(idTarefa !== 0){
      getTarefa(idTarefa).then(({data}) => {
        const {nome, dataInicio, dataFim, finalizada} = data.tarefa;
        setTarefa({ nome, dataInicio, dataFim, finalizada, projeto: data.tarefa.projeto._id});
      });
    } else {
      setTarefa(TarefaModel());
    }
  }, [idTarefa]);

  useEffect(() => {}, [tarefa]);

  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        size="large"
        onFinish={onFinish}
        fields={[
          {
            name: ["nome"],
            value: tarefa.nome,
          },
          {
            name: ["periodo"],
            value: tarefa.dataInicio? [ 
              moment(tarefa.dataInicio, "YYYY-MM-DD"), 
              moment(tarefa.dataFim, "YYYY-MM-DD")]: []
          },
          {
            name: ["finalizada"],
            value: tarefa.finalizada,
          },
          {
            name: ["projeto"],
            value: tarefa.projeto? tarefa.projeto : props.idProjeto,
          }
        ]}
      >
        <Form.Item label="Projeto" name="projeto"
            rules={[{ required: true, message: 'Projeto deve ser selecionado!' }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Selelecione o projeto"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {listaProjetos.map(projeto => (
              <Option key={projeto._id}>{projeto.nome}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Nome da atividade" 
            name="nome"
            rules={[{ required: true, message: 'Nome da atividade deve ser informado!' }]}
        >
          <Input />
        </Form.Item>
        <ConfigProvider locale={locale}>
            <Form.Item label="Período"
                name="periodo"
                rules={[{ type: 'array', required: true, message: 'Período da tarefa deve ser selecionado!' }]}
            >
                <RangePicker 
                    disabledDate={(current) => {
                        return current && current < moment().endOf('day');
                    }}
                    format="DD/MM/YYYY"
                />
            </Form.Item>
        </ConfigProvider>
        <Form.Item label="Finalizada" name="finalizada" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" size="larger">
                Salvar
            </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TarefaForm;
