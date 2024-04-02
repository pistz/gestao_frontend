import React from 'react';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import {IRemoveButtonProps} from "./types"

export const RemoveButton:React.FC<IRemoveButtonProps> = ({removeMethod}:IRemoveButtonProps) => {
    
    return (
        <Popconfirm
            title="Remover Registro"
            description="Deseja realmente remover este registro?"
            onConfirm={removeMethod}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
            <Button icon={<DeleteOutlined />}>remover</Button>
        </Popconfirm>)
}