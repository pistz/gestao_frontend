import { Table, Space, Spin, TableColumnsType} from 'antd';
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { ICourseRelationProps } from "./types"
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from '../../../shared/popMessage/PopMessage';
import { RemoveButton } from '../../../shared/remove-button/Remove';
import { ICourseRelation } from '../../../../entities/Course/CourseRelation';


export const EnrollTable = ({listQueryKey,getAllEntities, deleteEntity}:ICourseRelationProps<ICourseRelation>) => {

const columns:TableColumnsType<ICourseRelation> = [
    {
        title:'Nome',
        key:'firstName',
        render:(_,value) => <>{value.student.firstName}</>
    },
    {
        title:'Sobrenome',
        dataIndex:'lastName',
        key:'studentLastName',
        render:(_,value) => <>{value.student.lastName}</>
    },
    {
        title:'Cursos',
        dataIndex:'courseName',
        key:'courseName',
        render:(_,value) => <>{value.course.name}</>
    },
    {
        title:'Ano Letivo',
        dataIndex:'startingYear',
        key:'startingYear',
        render:(_,value) => <>{value.course.startingYear}</>
    },
]

const [listData, setListData] = useState<ICourseRelation[]>([]);

const queryClient = useQueryClient();

const { isLoading,isError,error } = useQuery({
    queryKey: [listQueryKey],
    queryFn: () => getAllEntities()
});

const removeEntity = useMutation({
    mutationFn: (entity : ICourseRelation) => {
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
    const tableData:ICourseRelation[] = await getAllEntities();
    if(tableData) setListData(tableData)
}
    getTableData();
},[listData]);


const dataColumns:ColumnsType<ICourseRelation> = [
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