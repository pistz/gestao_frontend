import { Table, Space, Spin, TableColumnsType} from 'antd';
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import IListActionsProps from "./types"
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { IStudent } from '../../../../entities/Student/Student';
import { notifySuccess, notifyError } from '../../../shared/popMessage/PopMessage';
import { RemoveButton } from '../../../shared/remove-button/Remove';


export const StudentTable = ({listQueryKey,getAllEntities,deleteEntity}:IListActionsProps<IStudent>) => {

const columns:TableColumnsType<IStudent> = [
    {
        title:'Número de Registro',
        dataIndex:'id',
        key:'id'
    },
    {
        title:'Nome',
        dataIndex:'firstName',
        key:'firstName',
    },
    {
        title:'Sobrenome',
        dataIndex:'lastName',
        key:'lastName',
    },
    {
        title:'E-mail',
        dataIndex:'email',
        key:'email'
    }
]

const [listData, setListData] = useState<IStudent[]>([]);

const queryClient = useQueryClient();

const { isLoading,isError,error } = useQuery({
    queryKey: [listQueryKey],
    queryFn: () => getAllEntities()
});

const removeEntity = useMutation({
    mutationFn: (entity : IStudent) => {
    return deleteEntity(entity['id']);
    },
    onSuccess: () =>{
        notifySuccess("Entrada removida")
        queryClient.invalidateQueries({ queryKey: [listQueryKey] });
    },
    onError: (error)=>{
        notifyError(`${error}`);
    }
});

if(isError){
    notifyError(`${error}`);
}


useEffect(()=>{
const getTableData = async () => {
    const tableData:IStudent[] = await getAllEntities();
    if(tableData) setListData(tableData)
}
    getTableData();
},[listData]);

const dataColumns:ColumnsType<IStudent> = [
    ...columns,
    {
    title: 'Opções',
    render: (_,record) => (
        <Space size="middle">
        <RemoveButton removeMethod={() => removeEntity.mutate(record)}></RemoveButton>
        </Space>
    ),
    }
]

    return (
        <Spin spinning={isLoading}>
            <Table 
                rowKey="id"
                dataSource={listData} 
                columns={dataColumns}
            />
        </Spin>
    )
}