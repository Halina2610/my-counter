import React, {ChangeEvent} from 'react';
import '../../App.css'

type SetInputPropsType = {
    value: number
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SetInput: React.FC<SetInputPropsType> = ({value, onChange}) => {

    const isRed = {
        border: value < 0 ? '5px solid #ab1717' : '3px solid #0e4f4f',
        backgroundColor: value < 0 ? '#f696c6' : '#6ae0e0'
    };

    return (
        <div>
            <input
                className="input"
                style={isRed}
                type="number"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

