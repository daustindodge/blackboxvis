import React, {createContext, useContext, useState} from "react";
import {SPEED} from "../lib/utils.js";

const StateContext = createContext({
    width: null,
    size: null,
    speed: null,
    running: null,
    bars: null,
    setWidth: () => {},
    setSize: () => {},
    setSpeed: () => {},
    setRunning: () => {},
    setBars: () => {},
});

export const SortingContextProvider = ({children}) =>
{
    const [width, setWidth] = useState(0);
    const [size, setSize] = useState(75);
    const [speed, setSpeed] = useState(SPEED.slow);
    const [running, setRunning] = useState(0);
    const [bars, setBars] = useState([]);

    return (
        <StateContext.Provider value={{
            width,
            size,
            speed,
            running,
            bars,
            setWidth,
            setSize,
            setSpeed,
            setRunning,
            setBars,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useSortingContext = () => useContext(StateContext);