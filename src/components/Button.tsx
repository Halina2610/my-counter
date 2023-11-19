import React from 'react';

type ButtonPropsType = {
    name: string
    callback: ()=> void
    disabled: boolean
}

export const Button: React.FC<ButtonPropsType> = ({name,callback, disabled}) => {
    const buttonStyle = disabled ? 'button-disabled' : 'button';

    return (
        <div className={"buttons"}>
            <button onClick={callback} className={buttonStyle}  disabled={disabled}>{name}</button>
        </div>
    );
};

