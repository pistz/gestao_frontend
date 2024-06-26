import React from 'react';
import { Layout, Menu } from 'antd';
import { IMenu } from './types';
import {contentStyle, footerStyle, headerStyle, innerLayoutStyle, menuStyles, outerLayoutStyles, siderStyles} from './styles'
import { useNavigate } from 'react-router-dom';
import { Footer, Header } from 'antd/es/layout/layout';
import { Logout } from '../logout/Logout';
import { useAuth } from '../../../hooks/useAuth';



const {Sider, Content} = Layout;

export const MainLayout:React.FC<IMenu> = ({listItems, children}:IMenu) => {

    const {userEmail} = useAuth();

    const menuItems:any = listItems?.map((item:any, index:any) => ({
            key: String(index),
            icon: React.createElement(item?.icon),
            label: `${item?.label}`
        }
    ));

    const navigate = useNavigate();

    const handleRedirect = (pages:any, key:string) =>{
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
                        <span></span>
                        <span></span>
                        <span></span>
                        <Logout />
                    </Header>
                    <Content style={contentStyle}>
                        {children}
                    </Content>
                    <Footer style={footerStyle}>
                        <span>Gestão de Frequência Online {new Date().getFullYear()}</span> 
                        <span>Projeto Integrador de Computação I</span>
                        <span>UNIVESP</span>
                        <br />
                        <p>Logado como <strong>{userEmail}</strong></p>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
