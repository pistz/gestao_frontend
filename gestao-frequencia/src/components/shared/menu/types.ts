import type { MenuProps } from 'antd';
import React from  'react';

export interface IMenu {
    listItems : MenuProps['items'] | undefined,
    children : React.ReactNode
}