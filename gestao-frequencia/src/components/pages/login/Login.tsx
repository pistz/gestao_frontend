import React, { useEffect} from "react"
import logo from '../../../assets/home-logo.png'
import { buttonsFormStyles, buttonStyles, formStyles, imgStyles, loginDivStyle, loginFormStyles, logoStyles } from "./styles";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { ILogin } from "./types";
import { notifyError } from "../../shared/popMessage/PopMessage";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LoginRepository } from "../../../repository/LoginRepository";

const validateLogin = new LoginRepository();

export const Login:React.FC = () =>{

    const {setSigned, setUserEmail, setUserPassword} = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values:ILogin) => {
        //TODO - fazer lógica de login correta
        try {
            await validateLogin.validateUser(values.email, values.password)
            .then(()=>{
                    setUserEmail(values.email)
                    setUserPassword(values.password)
                    setSigned(true)
                    sessionStorage.setItem('user', values.email);
                    sessionStorage.setItem('pass', values.password);
            })
        } catch (error) {
            console.error(error)
            notifyError("Usuário ou senha incorretos");
        }
    };

    useEffect(()=>{

        const findUser = sessionStorage.getItem('user');
        const findPass = sessionStorage.getItem('pass');
        if(findUser && findPass){
            const userData = {email:findUser, password:findPass};
            const handleLogin = async ()=>{
                const user = await validateLogin.validateUser(userData.email, userData.password);
                if(user !== null || user !== undefined){
                    setUserEmail(findUser);
                    setUserPassword(findPass);//TODO - alterar para token quando backend estiver correto
                    setSigned(true);
                    navigate('/home/main');
                }else{
                    sessionStorage.clear();
                }
            }
            handleLogin();
        }
    });

    return (
    <>
        <div style={loginDivStyle}>
            <div style={logoStyles}>
                <img style={imgStyles}src={logo} alt="app logo" />
            </div>  
            <br></br>
            <div style={loginFormStyles}>
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(e) => {
                onFinish(e)}}
            >
            <Form.Item
                name="email"
                rules={[{ required: true , message:'Insira o e-mail do usuário'}]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="E-mail" 
                type='email'
                style={formStyles}/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true , message:"Insira a senha do usuário"}]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={formStyles}
                />
            </Form.Item>

            <Form.Item style={buttonsFormStyles}>
                <Button 
                    block
                    type="primary" 
                    htmlType="submit" 
                    className="login-form-button" 
                    style={buttonStyles}
                >
                Entrar
                </Button>
            </Form.Item>
        </Form>
            </div>
        </div>
    </>
    )
}