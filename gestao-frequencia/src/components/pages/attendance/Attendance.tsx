import { Divider } from 'antd'
import React from 'react'
import { listContainerDivStyle } from '../lists/styles';
import { attendanceHeaderStyle } from './styles';

export const Attendance:React.FC = () => {

    const dividerText = (text:string):string => {
        return text.toUpperCase();
    }

    return (
        <>
        <div style={listContainerDivStyle}>
                <header style={attendanceHeaderStyle}>
                <Divider>{dividerText('chamada')}</Divider>
                </header>
        </div>

        
        </>

    )
}
