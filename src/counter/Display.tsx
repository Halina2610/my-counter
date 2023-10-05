import React from 'react';

interface DisplayProps {
    count: number;
    maxNum: number;
    minNum: number;
}

export const Display: React.FC<DisplayProps> = ({ count, maxNum, minNum }) => {
    const isRed = { color: count === maxNum ? '#ab1717' : 'inherit' };
    const value = count <= -1 ? "Недопустимое значение" : String(minNum);

    return (
        <div className="display count">
            <div style={isRed}>
                {count}
                {count <= -1 && <p style={{ fontSize: '20px' } }>{value}</p>}
            </div>
        </div>
    );
};