import { Layout, Menu, Typography } from 'antd';
import { 
  ProfileOutlined, 
  FundProjectionScreenOutlined, 
  ApartmentOutlined, 
  AppstoreAddOutlined 
} from '@ant-design/icons';
import Routes from './components/Routes';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="layout-base">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible 
        className="sider-menu"
        theme="light"
      >
        <div className="logo">
          <AppstoreAddOutlined />
          <span>Pro</span>
          <span>Ges</span>
        </div>
        
        <Menu mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<FundProjectionScreenOutlined />}>
            Indicadores
          </Menu.Item>
          <Menu.Item key="2" icon={<ApartmentOutlined />}>
            <Link to="/projetos">Projetos</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ProfileOutlined />}>
            <Link to="/tarefas">Tarefas</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="layout-content">
        <Header className="header" theme="light">
          <Title level={2}>Sistema de gestão de projetos</Title>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="content-main">
            <Routes />
          </div>
        <Footer style={{ textAlign: 'center' }}>Created by Deyvison Fernandes Baldoino</Footer>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
