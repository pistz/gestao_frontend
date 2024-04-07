import { Table, Space, Spin, TableColumnsType} from 'antd';
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query"
import { IListRelationProps } from "./types"
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';
import { notifySuccess, notifyError } from '../../../shared/popMessage/PopMessage';
import { RemoveButton } from '../../../shared/remove-button/Remove';
import { IList } from '../../../../entities/List/List';
import { CourseRepository } from '../../../../repository/CourseRepository';
import { useTableData } from '../../../../hooks/useTableData';

const courseRepository = new CourseRepository();

export const ListTable = ({listQueryKey,getAllEntities, deleteEntity}:IListRelationProps<IList>) => {


const {listsTableData, setListsTableData, coursesTableData, setCoursesTableData} = useTableData();

useEffect(()=>{
    const courseData = async ()=>{
        const result = await courseRepository.getAllCourses();
        return result
    }
    const dataCourse = courseData();
    dataCourse
        .then((res)=> setCoursesTableData(res))
},[setCoursesTableData])

const columns:TableColumnsType<IList> = [
    {
        title:'Data da Lista',
        key:'attendanceDate',
        render:(_,value) => <>{value.attendanceDate}</>
    },
    {
        title:'Matéria',
        dataIndex:'courseId',
        key:'courseName',
        render: (_,value) => {{
            const course = coursesTableData?.find((e) => e.id === value.courseId)
            return course?.name;
        }}
    },
    {
        title:'Alunos em Lista',
        dataIndex:'list',
        key:'counter',
        render:(_,value) => <>{value.students.length}</>
    }
]



const queryClient = useQueryClient();

const { isLoading,isError,error } = useQuery({
    queryKey: [listQueryKey],
    queryFn: () => getAllEntities()
});

const removeEntity = useMutation({
    mutationFn: (entity : IList) => {
    return deleteEntity(entity['id']);
    },
    onSuccess: async () =>{
        notifySuccess("Entrada removida")
        queryClient.invalidateQueries({ queryKey: [listQueryKey] });
        const tableData:IList[] = await getAllEntities();
        setListsTableData(tableData)
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
    const tableData:IList[] = await getAllEntities();
    if(tableData) setListsTableData(tableData)
}
    getTableData();
},[setListsTableData, getAllEntities]);


const dataColumns:ColumnsType<IList> = [
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
                dataSource={listsTableData} 
                columns={dataColumns}
        />
        </Spin>
    )
}