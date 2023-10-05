import React from 'react';
type ButtonPropsType = {
    name: string
    callback: ()=> void
    disabled?: boolean


}
export const Button = (props: ButtonPropsType) => {
    const buttonStyle = props.disabled ? 'button-disabled' : 'button';

    return (
        <div className={"buttons"}>
            <button onClick={props.callback} className={buttonStyle}  disabled={props.disabled}>{props.name}</button>
        </div>
    );
};

