import React from 'react';
import { Layout, Menu } from 'antd';
import { IMenu } from './types';
import type { MenuProps } from 'antd';
import {contentStyle, footerStyle, headerStyle, innerLayoutStyle, menuStyles, outerLayoutStyles, siderStyles} from './styles'
import { useNavigate } from 'react-router-dom';
import { Footer, Header } from 'antd/es/layout/layout';
import { Logout } from '../logout/Logout';



const {Sider, Content} = Layout;

export const MainLayout:React.FC<IMenu> = ({listItems, children}:IMenu) => {

    const menuItems:MenuProps['items'] = listItems?.map((item, index) => ({
            key: String(index),
            icon: React.createElement(item?.icon),
            label: `${item?.label}`
        }
    ));

    const navigate = useNavigate();

    const handleRedirect = (pages:MenuProps['items'], key:string) =>{
        if(pages){
            const index = Number(key);
            navigate(`${pages[index]?.path}`);
        }
    }

    return (
        <>
            <Layout hasSider={true} style={outerLayoutStyles}>
                <Sider
                    breakpoint='lg'
                    collapsedWidth='0'
                    style={siderStyles}
                >
                    <Menu 
                        theme="dark" 
                        mode="inline" 
                        defaultSelectedKeys={['0']} 
                        items={menuItems} 
                        style={menuStyles}
                        onClick={(e) => 
                            handleRedirect(listItems, e.key)
                        }
                        
                    />               
                </Sider>
                <Layout style={innerLayoutStyle}>
                    <Header style={headerStyle}>
                        <p>Logado como usuário</p> {/** incluir usuário logado*/}
                        <Logout />
                    </Header>
                    <Content style={contentStyle}>
                        {children}
                    </Content>
                    <Footer style={footerStyle}>
                        <span>Gestão de Frequência Online {new Date().getFullYear()}</span> 
                        <span>Projeto Integrador de Computação I</span>
                        <span>UNIVESP</span>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
