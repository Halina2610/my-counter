import React, { useState, useEffect, useCallback, useMemo, ChangeEvent } from 'react';
import './App.css';
import { Display } from './counter/Display';
import { Button } from './components/Button';
import { SetInput } from "./setting/SetInput";

function App() {
    const [state, setState] = useState({
        maxValue: 5,
        minValue: 0,
        count: 0,
        invalidMinValue: false
    });

    const { maxValue, minValue, count, invalidMinValue } = state;

    useEffect(() => {
        const localMaxValueNum = localStorage.getItem('counterLimits');
        if (localMaxValueNum) {
            const parsedValue = JSON.parse(localMaxValueNum);
            setState(prevState => ({ ...prevState, maxValue: parsedValue[0], minValue: parsedValue[1] }));
        }
    }, []);

    const incHandler = useCallback(() => {
        if (count < maxValue) {
            setState(prevState => ({ ...prevState, count: prevState.count + 1 }));
        }
    }, [count, maxValue]);

    const resetHandler = useCallback(() => {
        setState(prevState => ({ ...prevState, count: prevState.minValue }));
    }, [minValue]);

    const changeMaxValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        setState(prevState => ({
            ...prevState,
            maxValue: newValue,
            invalidMinValue: newValue <= prevState.minValue
        }));
    }, []);

    const changeMinValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        setState(prevState => ({
            ...prevState,
            minValue: newValue,
            invalidMinValue: newValue < 0
        }));
    }, []);

    const isCorrectValue = useMemo(() => maxValue > 0 && minValue >= 0 && maxValue > minValue, [maxValue, minValue]);

    const setLimitsHandler = useCallback(() => {
        if (isCorrectValue) {
            const limits = [maxValue, minValue];
            localStorage.setItem('counterLimits', JSON.stringify(limits));
        }
    }, [isCorrectValue, maxValue, minValue]);

    return (
        <div className="App">
            <div className="counter-wrapper">
                <div>max value:</div>
                <SetInput value={maxValue} onChange={changeMaxValueHandler} />
                <div>start value:</div>
                <SetInput value={minValue} onChange={changeMinValueHandler} />

                <div className="button-wrapper">
                    <Button name="set" callback={setLimitsHandler} disabled={minValue < 0} />
                </div>
            </div>

            <div className="counter-wrapper">
                <Display count={count || minValue} maxNum={maxValue} minNum={minValue} />

                <div className="button-wrapper">
                    <Button callback={incHandler} name="inc" disabled={count === maxValue || count < 0} />
                    <Button callback={resetHandler} name="reset" disabled={count < 0} />
                </div>
            </div>
        </div>
    );
}

export default App;