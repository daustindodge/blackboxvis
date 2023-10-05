import React from "react";

export const randomize = (width, size) =>
{
    let array = [];

    let w = width / size;

    for (let i = 0; i < size; i++) {
        let h = Math.floor(Math.random() * (70 - 6) + 5);

        array.push({height: h, width: w, color: "#a6a6a6"});
    }

    return [...array];
}

export const SPEED = {
    slow: '100',
    medium: '50',
    fast: '10'
};

export const STATE = {
    idle: 0,
    running: 1,
    paused: 2,
    unpaused: 3,
};