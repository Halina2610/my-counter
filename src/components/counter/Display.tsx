import React from 'react';

type DisplayProps ={
    count: number;
    maxNum: number;
    minNum: number;
}

export const Display: React.FC<DisplayProps> = ({count, maxNum, minNum}) => {

    const isNoCorrectValue =  maxNum < 0 || minNum < 0 || minNum >= maxNum;

    const isRed =
        isNoCorrectValue || count < 0 || count === maxNum
            ? {color: '#ab1717'}
            : {color: 'inherit'};

    const value =
        isNoCorrectValue
            ? "Entered invalid values and press 'set'"
            : minNum;

    console.log({ count });

    return (
        <div className="display count">
            <div style={isRed}>
                {count}
                {isNoCorrectValue && <p style={{ fontSize: '20px', color: '#ab1717' }}>{value}</p>}
            </div>
        </div>
    )};
