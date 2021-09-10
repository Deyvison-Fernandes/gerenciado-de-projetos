import React, { useState, useEffect} from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  ConfigProvider,
  message
} from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br';
import locale from 'antd/lib/locale/pt_BR';
import { getProjeto, postProjeto } from '../../services/api';

const { RangePicker } = DatePicker;

const ProjetoForm = (props) => {
  const projetoModel = () => {
    return {
      nome: "",
      dataInicio: null,
      dataFim: null
    }
  };

  const [projeto, setProjeto] = useState({});

  const onFinish = (values) => {
    const nome = values['nome'];
    const dataInicio = values['periodo'][0].format('YYYY-MM-DD');
    const dataFim = values['periodo'][1].format('YYYY-MM-DD');
    const projetoForm = {
      nome, dataInicio, dataFim
    };

    message.loading({ content: 'Executando ação...', key: 'alertloading' });
    postProjeto(projetoForm, props.idProjeto).then(() => {
      message.success({ content: 'Projeto salvo com sucesso', key: 'alertloading' });
      props.callback();
      setProjeto(projetoForm);
    });
  };

  useEffect(() => {
    if(props.idProjeto !== 0){
      getProjeto(props.idProjeto).then(({data}) => {
        let {nome, dataInicio, dataFim} = data.projeto;
        setProjeto({nome, dataInicio, dataFim});
      });
    } else {
      setProjeto(projetoModel());
    }
  }, [props.idProjeto]);

  useEffect(() => {}, [projeto]);
  
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
            value: projeto.nome,
          },
          {
            name: ["periodo"],
            value: projeto.dataInicio? [
              projeto.dataInicio? moment(projeto.dataInicio, "YYYY-MM-DD") : null, 
              projeto.dataFim? moment(projeto.dataFim, "YYYY-MM-DD") : null
            ]: [],
          }
        ]}
      >
        <Form.Item label="Nome do projeto" 
            name="nome"
            rules={[{ required: true, message: 'Nome do projeto deve ser informado!' }]}
        >
          <Input/>
        </Form.Item>
        <ConfigProvider locale={locale}>
            <Form.Item label="Período"
                name="periodo"
                rules={[{ type: 'array', required: true, message: 'Período do projeto deve ser selecionado!' }]}
            >
                <RangePicker 
                    disabledDate={(current) => {
                        return current && current < moment().endOf('day');
                    }}
                    format="DD/MM/YYYY"
                />
            </Form.Item>
        </ConfigProvider>
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Button type="primary" htmlType="submit" size="larger">
              Salvar
            </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjetoForm;
