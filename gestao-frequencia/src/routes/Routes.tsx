import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../components/pages/login/Login';
import { Home } from '../components/pages/home/Home';
import { FileAddOutlined, HomeOutlined, PartitionOutlined, ScheduleOutlined, SnippetsOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Welcome } from '../components/pages/welcome/Welcome';
import { ErrorPage } from '../components/pages/error/Error';
import { useAuth } from '../hooks/useAuth';
import { List } from '../components/pages/lists/List';
import { Courses } from '../components/pages/courses/Courses';
import { Students } from '../components/pages/students/Students';
import { Enroll } from '../components/pages/enroll/Enroll';
import { Attendance } from '../components/pages/attendance/Attendance';

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
        path:'attendance',
        element: < Attendance /> ?? < ErrorPage />
    },  
    {
        icon:PartitionOutlined,
        label:'Cadastrar Matéria',
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
        icon:FileAddOutlined,
        label: 'Matricular Alunos',
        path: 'enroll',
        element: <Enroll /> ?? < ErrorPage />
    },
    {
        icon:SnippetsOutlined,
        label:'Criar Chamadas',
        path:'lists',
        element: <List /> ?? < ErrorPage />
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