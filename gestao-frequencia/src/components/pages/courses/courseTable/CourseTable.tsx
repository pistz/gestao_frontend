import { Table, Space, Spin, TableColumnsType} from 'antd';
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import {IListActionsProps} from "./types"
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from '../../../shared/popMessage/PopMessage';
import { RemoveButton } from '../../../shared/remove-button/Remove';
import { ICourse } from '../../../../entities/Course/Course';


export const CourseTable = ({listQueryKey,getAllEntities,deleteEntity}:IListActionsProps<ICourse>) => {

const columns:TableColumnsType<ICourse> = [
    {
        title:'Id da Matéria',
        dataIndex:'id',
        key:'id'
    },
    {
        title:'Nome',
        dataIndex:'name',
        key:'name',
    },
    {
        title:'Ano de Início',
        dataIndex:'startingYear',
        key:'startingYear',
    },
    {
        title:'Escola ',
        dataIndex:'school',
        key:'school',
        render:(_,record) => (record.school.schoolName)
    },
];


const [listData, setListData] = useState<ICourse[]>([]);

const queryClient = useQueryClient();

const { isLoading,isError,error } = useQuery({
    queryKey: [listQueryKey],
    queryFn: () => getAllEntities()
});

const removeEntity = useMutation({
    mutationFn: (entity : ICourse) => {
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
    const tableData:ICourse[] = await getAllEntities();
    if(tableData) setListData(tableData)
}
    getTableData();
},[listData]);


const dataColumns:ColumnsType<ICourse> = [
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