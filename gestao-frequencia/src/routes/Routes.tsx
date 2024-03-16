import { UserOutlined, UsergroupAddOutlined, PartitionOutlined, SettingOutlined, ScheduleOutlined, HomeOutlined } from '@ant-design/icons';
import { ErrorPage } from '../components/pages/error/Error';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../components/pages/login/Login';
import { Home } from '../components/pages/home/Home';
import { Welcome } from '../components/pages/welcome/Welcome';
import { useContext } from 'react';
import AuthContext from '../components/context/authenticate';

export const routes = [
    {
        icon:HomeOutlined,
        label:'Home',
        path:'main',
        element: <Welcome />
    },
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
    },
]

export const RoutesReference: React.FC = () =>{

    const {signed} = useContext(AuthContext);

    const ForbiddenAcces:React.FC =()=>{
        return (<Navigate to='/' />)
    }
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={signed ? <Home /> : <ForbiddenAcces />}>
                    {routes.map((_,index) => <Route path={routes[index].path} element={routes[index].element} key={index} />)}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}