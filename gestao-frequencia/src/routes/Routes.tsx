import { UserOutlined, UsergroupAddOutlined, PartitionOutlined, SettingOutlined, ScheduleOutlined } from '@ant-design/icons';
import { ErrorPage } from '../components/pages/error/Error';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../components/pages/login/Login';
import { Home } from '../components/pages/home/Home';

export const routes = [
    {
        icon:ScheduleOutlined,
        label:'Fazer chamada',
        path:'list',
        element: <ErrorPage />
    },
    {
        icon:PartitionOutlined,
        label:'Cadastrar Curso',
        path:'course',
        element: <ErrorPage />
    },
    {
        icon:UsergroupAddOutlined,
        label:'Cadastrar Alunos',
        path:'students',
        element: <ErrorPage />
    },
    {
        icon:SettingOutlined,
        label:'Configurações',
        path:'settings',
        element: <ErrorPage />
    },
    {
        icon:UserOutlined,
        label: 'Meu Perfil',
        path: 'profile',
        element: <ErrorPage />
    }
]

export const RoutesReference: React.FC = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />}>
                    {routes.map((_,index) => <Route path={routes[index].path} element={routes[index].element} key={index} />)}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}