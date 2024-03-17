import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Wrap } from './styles';
import { PoweroffOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth';


export const Logout:React.FC = () => {

    const navigate = useNavigate();
    const {setSigned} = useAuth();

    const handleLogout = () =>{
        setSigned(false);
        console.log('logged Out')
        navigate("/login");
    }

    return (
        <>
            <Wrap onClick={handleLogout}>
                <PoweroffOutlined style={{fontSize:'2rem', color:'#fff'}} alt='Logout' title='Sair'/>
            </Wrap>
        </>
    )
}
