import React from 'react';

interface DisplayProps {
    count: number;
    maxNum: number;
    minNum: number;
}

export const Display: React.FC<DisplayProps> = ({ count, maxNum, minNum }) => {
    const isRed = { color: count === maxNum ? '#ab1717' : 'inherit' };
    const value = count < 0 ? "Enter values and press 'set'" : String(minNum);

    return (
        <div className="display count">
            <div style={isRed}>
                {count}
                {count < 0 && <p style={{ fontSize: '20px', color: '#ab1717' } }>{value}</p>}
            </div>
        </div>
    );
};