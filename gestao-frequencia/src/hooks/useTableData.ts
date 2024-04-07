import { useContext } from 'react';
import TableDataContext from '../context/tableData';


export const useTableData = () => {
    const context = useContext(TableDataContext);

    return context;
}