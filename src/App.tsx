import React, {useState, useEffect, ChangeEvent} from 'react';
import './App.css';
import {Display} from './counter/Display';
import {Button} from './components/Button';

function App() {
    const [maxValue, setMaxValue] = useState<number>(5);
    const [minValue, setMinValue] = useState<number>(0);
    const [count, setCount] = useState<number>(minValue);
    const [invalidMinValue, setInvalidMinValue] = useState(false)

    useEffect(() => {
        const localMaxValueNum = localStorage.getItem('counterLimits');
        if (localMaxValueNum) {
            const parsedValue = JSON.parse(localMaxValueNum);
            setMaxValue(parsedValue[0]);
            setMinValue(parsedValue[1]);
        }
    }, []);

    const incHandler = () => count < maxValue && setCount(count + 1);

    const resetHandler = () => setCount(minValue);

    const changeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        setMaxValue(newValue);
        setInvalidMinValue(newValue <= minValue);
    };

    const changeMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        setMinValue(newValue);
        setInvalidMinValue(newValue <= -1);
    };

    const isCorrectValue = maxValue > 0 && minValue >= 0 && maxValue > minValue;

    const setLimitsHandler = () => {
        if (isCorrectValue) {
            const limits = [maxValue, minValue];
            localStorage.setItem('counterLimits', JSON.stringify(limits));
        }
    };

    return (
        <div className="App">
            <div className="input-wrapper">
                <div>max value:</div>
                <input
                    className="input"
                    type="number"
                    value={maxValue}
                    onChange={changeMaxValueHandler}
                />
                <input
                    className="input"
                    type="number"
                    value={minValue}
                    onChange={changeMinValueHandler}
                />
                <Button
                    name="set"
                    callback={setLimitsHandler}
                    disabled={!isCorrectValue}
                />
            </div>

            <div>
                <Display count={count || minValue} maxNum={maxValue} minNum={minValue}/>
                <div className="button-wrapper">
                    <Button
                        callback={incHandler}
                        name="inc"
                        disabled={count === maxValue}
                    />
                    <Button callback={resetHandler} name="reset"/>
                </div>
            </div>
        </div>
    );
}

export default App;