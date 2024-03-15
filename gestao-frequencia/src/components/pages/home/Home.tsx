import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo-escola.png'
import { IContent } from './types';

const { Header, Content, Footer, Sider } = Layout;

// const sideMenu = [        
//     {
//         key: "1",
//         icon: React.createElement(HomeOutlined),
//         label: "Home",
//     },
//     {
//         key: "2",
//         icon: React.createElement(SettingOutlined),
//         label: "Opções do Usuário",
//     },
//     {
//         key: "3",
//         icon: React.createElement(TeamOutlined),
//         label: "Cadastrar Alunos",
//     },
//     {
//         key: "4",
//         icon: React.createElement(FileAddOutlined),
//         label: "Cadastrar Turma",
//     },
//     {
//         key: "5",
//         icon: React.createElement(FileSearchOutlined),
//         label: "Realizar Chamada",
//     },    
// ]



export const Home:React.FC<IContent> = ({titles, children}:IContent) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const handleRedirect = (pages:string[], key:string) => {
        navigate(`${pages[Number(key)]}`);
    }

    const menuItems = new Array(titles.length).fill(null).map((_,index) => {
        const key = index + 1;
        return {
            key,
            icon:`${titles[index].icon}`,
            label: `${titles[index].label}`
        }
    });

return (
    <Layout>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
            console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} onClick={(e) => handleRedirect(titles.label, e.key)}/>
        </Sider>
        <Layout>
            <Header style={{ padding: '0 12rem', background: colorBgContainer, alignContent: 'center', justifyContent: 'center', display: 'flex'}}>
                <img src={logo} alt='Logo da Escola'/>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
            <div
                style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                }}
            >
                {children}
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            Gestão de Chamadas ©{new Date().getFullYear()} Created by PI-STZ
            </Footer>
        </Layout>
    </Layout>
    );
};