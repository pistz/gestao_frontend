import type { MenuProps } from 'antd';
import React from  'react';

export interface IMenu {
    listItems : MenuProps['items'] | undefined | any,
    children : React.ReactNode
}