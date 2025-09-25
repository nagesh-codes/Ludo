/* Dice.jsx */
import React, { useState, useRef, useEffect } from 'react';
import '../css-files/Dice.css';

const faceAngles = {
    1: [0, 0, 0],
    2: [0, -90, 0],
    3: [0, 180, 0],
    4: [0, 90, 0],
    5: [-90, 0, 0],
    6: [90, 0, 0]
};

function PipGrid({ pattern }) {
    return (
        <div className="pips">
            {pattern.map((dot, i) => (
                <div key={i} className={dot ? 'dot' : ''}></div>
            ))}
        </div>
    );
}

export default function Dice({ number, isDisable = false }) {
    const [value, setValue] = useState('—');
    const diceRef = useRef(null);
    const rollingRef = useRef(false);

    const faces = [
        [false, false, false, false, true, false, false, false, false],
        [true, false, false, false, false, false, false, false, true],
        [true, false, false, false, true, false, false, false, true],
        [true, false, true, false, false, false, true, false, true],
        [true, false, true, false, true, false, true, false, true],
        [true, false, true, true, false, true, true, false, true]
    ];

    const roll = (newVal) => {
        // if (rollingRef.current || isDisable) return;
        rollingRef.current = true;
        setValue('…');
        const [bx, by, bz] = faceAngles[newVal];

        // Generate significant, random base rotations for all axes
        const randomX = Math.floor(Math.random() * 6) + 3; // 3 to 8 full rotations
        const randomY = Math.floor(Math.random() * 6) + 3; // 3 to 8 full rotations
        const randomZ = Math.floor(Math.random() * 6) + 3; // 3 to 8 full rotations

        const rx = bx + 360 * randomX;
        const ry = by + 360 * randomY;
        const rz = bz + 360 * randomZ;

        if (diceRef.current) {
            diceRef.current.classList.add('rolling');
            diceRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
        }

        const handler = (e) => {
            if (e.propertyName !== 'transform') return;
            if (diceRef.current) {
                diceRef.current.removeEventListener('transitionend', handler);
                setTimeout(() => {
                    diceRef.current.classList.remove('rolling');
                    setValue(newVal);
                    rollingRef.current = false;
                }, 120);
            }
        };

        if (diceRef.current) {
            diceRef.current.addEventListener('transitionend', handler);
        }
    };

    useEffect(() => {
        if (number > 0) {
            roll(number);
        }
        console.log("numer="+number)
    }, [number]);

    useEffect(() => {
        // Initial idle orientation
        const initialIdle = setTimeout(() => {
            if (diceRef.current)
                diceRef.current.style.transform = 'rotateX(-12deg) rotateY(14deg)';
        }, 350);

        return () => {
            clearTimeout(initialIdle);
        };
    }, []);

    return (
        <div className="wrap">
            <div className="scene">
                <div className="dice" ref={diceRef}>
                    {faces.map((pattern, i) => (
                        <div key={i} className={`face f${i + 1}`}>
                            <PipGrid pattern={pattern} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}