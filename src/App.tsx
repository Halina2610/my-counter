import React, {useState, useEffect, useCallback, useMemo, ChangeEvent} from 'react';
import './App.css';
import {Display} from './components/counter/Display';
import {Button} from './components/Button';
import {SetInput} from "./components/setting/SetInput";

function App() {

    const [state, setState] = useState(() => {
        const localMaxValueNum = localStorage.getItem('counterLimits');
        if (localMaxValueNum) {
            const parsedValue = JSON.parse(localMaxValueNum);
            return {
                maxValue: parsedValue[0],
                minValue: parsedValue[1],
                count: parsedValue[1], // Используем minValue в качестве начального значения count
            };
        }

        return {
            maxValue: 5,
            minValue: 0,
            count: 0,
        };
    });

    const {maxValue, minValue, count} = state;


    useEffect(() => {
        const localMaxValueNum = localStorage.getItem('counterLimits');
        if (localMaxValueNum) {
            const parsedValue = JSON.parse(localMaxValueNum);
            setState(newState => ({
                ...newState, maxValue: parsedValue[0], minValue: parsedValue[1]
            }));
        }
    }, []);


    const incHandler = useCallback(() => {
        if (count < maxValue) {
            setState(newState => ({
                ...newState, count: newState.count + 1
            }));
        }
    }, [count, maxValue]);


    const resetHandler = useCallback(() => {
        setState(newState => ({
            ...newState, count: newState.minValue
        }));
    }, [minValue]);


    const changeMaxValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        setState(newState => ({
            ...newState,
            maxValue: newValue,
            invalidMinValue: newValue <= newState.minValue
        }));
    }, []);


    const changeMinValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        setState(newState => ({
            ...newState,
            minValue: newValue,
            invalidMinValue: newValue < 0
        }));
    }, []);


    const isCorrectValue = useMemo(
        () => maxValue > 0 && minValue >= 0 && maxValue > minValue, [maxValue, minValue]);


    const setLimitsHandler = useCallback(() => {
        if (isCorrectValue) {
            const limits = [maxValue, minValue];
            localStorage.setItem('counterLimits', JSON.stringify(limits));
            setState(newState => ({
                ...newState,
                count: newState.count < minValue ? minValue : newState.count
            }));
        }
    }, [isCorrectValue, maxValue, minValue]);


    return (
        <div className="App">
            <div className="counter-wrapper">
                <div>max value:</div>
                <SetInput value={maxValue} onChange={changeMaxValueHandler}/>
                <div>start value:</div>
                <SetInput value={minValue} onChange={changeMinValueHandler}/>

                <div className="button-wrapper">
                    <Button name="set" callback={setLimitsHandler} disabled={!isCorrectValue}/>
                </div>
            </div>

            <div className="counter-wrapper">
                <Display count={count} maxNum={maxValue} minNum={minValue}/>

                <div className="button-wrapper">
                    <Button callback={incHandler} name="inc"
                            disabled={!isCorrectValue}/>
                    <Button callback={resetHandler} name="reset"
                            disabled={!isCorrectValue}/>
                </div>
            </div>
        </div>
    );
}

export default App;