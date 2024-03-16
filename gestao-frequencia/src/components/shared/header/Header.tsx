import React from 'react';
import { IHeader } from './types';
import { divStyle, headerStyle } from './style';


export const HeaderMenu:React.FC<IHeader> = ({children}:IHeader) => {
    return (
        <>
            <header style={headerStyle}>
                <div style={divStyle}>
                    {children}
                </div>
            </header>
        </>
    )   
}
