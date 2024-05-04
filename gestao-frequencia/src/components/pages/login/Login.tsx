import React, { useEffect, useState} from "react"
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

    const {setSigned, setUserEmail, setUserSchoolId, setSchoolname, setUserRole} = useAuth();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const onFinish = async (values:ILogin) => {
        try {
            setIsDisabled(true);
            await validateLogin.validateUser(values.email, values.password)
            .then((data)=>{
                    setSigned(true)
                    sessionStorage.setItem('$us', JSON.stringify(data.id));
                    sessionStorage.setItem('$', JSON.stringify(data.school['id']));
            })
        } catch (error) {
            setIsDisabled(false);
            console.error(error)
            notifyError("Usuário ou senha incorretos");
        }
    };

    useEffect(()=>{
        const findUser = sessionStorage.getItem('$us');
        const findSchool = sessionStorage.getItem('$');
        if(findUser && findSchool){
            const userData = JSON.parse(findUser);
            const school = JSON.parse(findSchool);
            const handleLogin = async ()=>{
                const user = await validateLogin.getUser(userData);
                if(user !== null || user !== undefined){
                    const {id} = user.school;
                    const {schoolName} = user.school;
                    setUserRole(user.role);
                    setUserEmail(user.email);
                    setUserSchoolId(id);
                    setSchoolname(schoolName);
                    setSigned(school === id);
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
                    disabled={isDisabled}
                >
                {isDisabled? "Carregando" : "Entrar"}
                </Button>
            </Form.Item>
        </Form>
            </div>
        </div>
    </>
    )
}