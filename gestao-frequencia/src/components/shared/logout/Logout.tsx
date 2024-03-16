import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wrap } from './styles';
import { PoweroffOutlined } from '@ant-design/icons';
import AuthContext from '../../context/authenticate';


export const Logout:React.FC = () => {

    const navigate = useNavigate();
    const {setSigned} = useContext(AuthContext)

    const handleLogout = () =>{
        setSigned(false);
        console.log('logged Out')
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
