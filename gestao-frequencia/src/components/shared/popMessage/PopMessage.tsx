import { message } from 'antd';


export const notifySuccess = (msg:string) => {
    message.success(msg);
}

export const notifyError = (error : string) =>{
    message.error(error)
}