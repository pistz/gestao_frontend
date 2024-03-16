import React from 'react';
import { Layout, Menu } from 'antd';
import { IMenu } from './types';
import type { MenuProps } from 'antd';
import {menuStyles, layoutStyles, siderStyles} from './styles'
import { useNavigate } from 'react-router-dom';


const {Sider, Content} = Layout;

export const SideMenu:React.FC<IMenu> = ({listItems, children}:IMenu) => {

    const menuItems:MenuProps['items'] = listItems?.map((item, index) => ({
            key: String(index),
            icon: React.createElement(item.icon),
            label: `${item.label}`
        }
    ));

    const navigate = useNavigate();

    const handleRedirect = (pages:MenuProps['items'], key:string) =>{
        if(pages){
            const index = Number(key);
            navigate(`${pages[index]}`);
        }
    }

    return (
        <>
            <Layout hasSider={true} style={layoutStyles}>
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
                        onClick={(e) => handleRedirect(menuItems, e.key)}
                    />
                </Sider>
                <Content>
                    {children}
                </Content>
            </Layout>
        </>
    )
}
