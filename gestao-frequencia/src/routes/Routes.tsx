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

const routes = [
    {
        icon:HomeOutlined,
        label:'Home',
        path:'main',
        element: <Welcome /> ?? < ErrorPage />,
        role:['ADMIN', 'DESK', 'PROFESSOR']
    },
    {
        icon:ScheduleOutlined,
        label:'Fazer chamada',
        path:'attendance',
        element: < Attendance /> ?? < ErrorPage />,
        role:['ADMIN', 'PROFESSOR']
    },  
    {
        icon:PartitionOutlined,
        label:'Cadastrar Matéria',
        path:'course',
        element: <Courses /> ?? < ErrorPage />,
        role:['ADMIN', 'DESK']
    },
    {
        icon:UsergroupAddOutlined,
        label:'Cadastrar Alunos',
        path:'students',
        element: <Students /> ?? < ErrorPage />,
        role:['ADMIN', 'DESK']
    },
    {
        icon:FileAddOutlined,
        label: 'Matricular Alunos',
        path: 'enroll',
        element: <Enroll /> ?? < ErrorPage />,
        role:['ADMIN', 'DESK']
    },
    {
        icon:SnippetsOutlined,
        label:'Criar Chamadas',
        path:'lists',
        element: <List /> ?? < ErrorPage />,
        role:['ADMIN', 'DESK']
    },

]

export function filteredRoutes(userRole:string){
    const filtered = routes.filter((e) => e.role.includes(userRole));
    console.log(filtered);
    return filtered;
}  
    
    

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