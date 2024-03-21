import React from 'react'
import { Wrap } from './styles';
import { PoweroffOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth';


export const Logout:React.FC = () => {


    const {setSigned} = useAuth();

    const handleLogout = () =>{
        setSigned(false);
        sessionStorage.clear();
    }

    return (
        <>
            <Wrap onClick={handleLogout}>
                <PoweroffOutlined style={{fontSize:'2rem', color:'#fff'}} alt='Logout' title='Sair'/>
            </Wrap>
        </>
    )
}
