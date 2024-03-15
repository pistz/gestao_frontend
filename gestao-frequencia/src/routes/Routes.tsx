import { ErrorPage } from "../components/pages/error/Error";
import { FileSearchOutlined, HomeOutlined, SettingOutlined, TeamOutlined, FileAddOutlined } from '@ant-design/icons';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";


export const routes = [
    {
        path: 'home',
        element:<ErrorPage />,
        icon: React.createElement(HomeOutlined),
        label: 'Home',
    },
    {
        path: 'home',
        element:<ErrorPage />,
        icon: React.createElement(SettingOutlined),
        label: "Opções do Usuário",
    },
    {
        path: 'home',
        element:<ErrorPage />,
        icon: React.createElement(TeamOutlined),
        label: "Cadastrar Alunos",
    },
    {
        path: 'home',
        element:<ErrorPage />,
        icon: React.createElement(FileAddOutlined),
        label: "Cadastrar Turma",
    },
    {
        path: 'home',
        element:<ErrorPage />,
        icon: React.createElement(FileSearchOutlined),
        label: "Realizar Chamada",
    },

];

export const Pages = routes.map((_,index) => routes[index]);

export const RoutesReference: React.FC = () =>{

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}/>
            </Routes>
        </BrowserRouter>
    )
}