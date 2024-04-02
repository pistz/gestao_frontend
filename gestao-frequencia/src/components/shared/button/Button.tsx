import React, {  useState } from 'react';
import { ButtonProps } from './types';



export const Button: React.FC<ButtonProps> = ({text, type, click}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    
    const ButtonStyle: React.CSSProperties = {
        backgroundColor: isActive ? '#001529' : isHovered ? '#193766' : '#434f5a',
        color: 'white',
        padding: '1rem 1rem',
        margin:'1rem',
        border: 'none',
        borderRadius: '0.4rem 0.4rem',
        boxShadow: isActive ? '0 1px 2px rgba(0, 0, 0, 0.2)' : isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '1rem',
        textTransform: 'uppercase',
        cursor: 'pointer',
        minWidth:'8em',
        transition: 'background-color 0.3s, box-shadow 0.3s'
    };

    return (
        <button
            type={type}
            style={ButtonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onClick={click}
        >
            {text}
        </button>
    );
};