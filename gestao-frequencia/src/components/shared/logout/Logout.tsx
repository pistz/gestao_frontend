import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Wrap } from './styles';
import { PoweroffOutlined } from '@ant-design/icons';


export const Logout:React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        navigate("/");
    }

    return (
        <>
            <Wrap onClick={handleLogout}>
                <PoweroffOutlined style={{fontSize:'2rem', color:'#fff'}} alt='Logout' title='Sair'/>
            </Wrap>
        </>
    )
}
