import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../components/pages/login/Login';
import { Home } from '../components/pages/home/Home';
import { HomeOutlined, PartitionOutlined, ScheduleOutlined, SettingOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Welcome } from '../components/pages/welcome/Welcome';
import { ErrorPage } from '../components/pages/error/Error';
import { useAuth } from '../hooks/useAuth';
import { List } from '../components/pages/list/List';
import { Courses } from '../components/pages/courses/Courses';
import { Students } from '../components/pages/students/Students';

export const routes = [
    {
        icon:HomeOutlined,
        label:'Home',
        path:'main',
        element: <Welcome /> ?? < ErrorPage />
    },
    {
        icon:ScheduleOutlined,
        label:'Fazer chamada',
        path:'list',
        element: <List /> ?? < ErrorPage />
    },
    {
        icon:PartitionOutlined,
        label:'Cadastrar Curso',
        path:'course',
        element: <Courses /> ?? < ErrorPage />
    },
    {
        icon:UsergroupAddOutlined,
        label:'Cadastrar Alunos',
        path:'students',
        element: <Students /> ?? < ErrorPage />
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

    const {signed} = useAuth();

    const ForbiddenAcces:React.FC =()=>{
        return (<Navigate to='/' />)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='*' element={<Login />} />
                <Route path='/login' element={<Login />}/>
                <Route path='/home' element={signed ? <Home /> : <ForbiddenAcces />}>
                    {routes.map((_,index) => <Route path={routes[index].path} element={routes[index].element} key={index} />)}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}