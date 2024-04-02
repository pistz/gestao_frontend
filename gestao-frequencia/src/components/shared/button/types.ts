import { MouseEventHandler } from "react";

type buttonType = 'submit'|'reset'|'button' ;

export interface ButtonProps {
    text: string;
    type:buttonType,
    click?:MouseEventHandler<HTMLButtonElement>,
}