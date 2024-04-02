import { Table, Space, Spin } from 'antd';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import IListActionsProps, { ModelType, Model } from "./types";
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from '../popMessage/PopMessage';
import { RemoveButton } from '../remove-button/Remove';

export const DynamicTable = <T extends Model>({ listQueryKey, columns, getAllEntities, deleteEntity, type }: IListActionsProps<T>) => {
    const [listData, setListData] = useState<ModelType<T>[]>([]);

    const queryClient = useQueryClient();

    const { isLoading, isError, error, data } = useQuery<ModelType<T>[]>({
        queryKey: [listQueryKey],
        queryFn: getAllEntities
    });

    const removeEntity = useMutation({
        mutationFn: (id: string) => deleteEntity(id),
        onSuccess: () => {
            notifySuccess("Entrada removida");
            queryClient.invalidateQueries([listQueryKey]);
        },
        onError: (error) => {
            notifyError(`${error}`);
        }
    });

    useEffect(() => {
        if (data) {
            setListData(data);
        }
    }, [data]);

    const dataColumns: ColumnsType<ModelType<T>> = [
        ...columns,
        {
            title: 'Opções',
            key: 'options',
            render: (_, record: ModelType<T>) => (
                <Space size="middle">
                    <RemoveButton removeMethod={() => removeEntity.mutate(record[type]?.id)} />
                </Space>
            ),
        }
    ];

    if (isError && error instanceof Error) {
        notifyError(error.message);
    }

    return (
        <Spin spinning={isLoading}>
            <Table
                rowKey="id"
                dataSource={listData}
                columns={dataColumns}
            />
        </Spin>
    );
};
