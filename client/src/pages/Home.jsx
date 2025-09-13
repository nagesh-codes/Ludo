import React from 'react'
import dice from '../assets/dice.png'
import red_pawn from '../assets/red-pawn.png'
import yellow_pawn from '../assets/yellow-pawn.png'
import green_pawn from '../assets/green-pawn.png'
import blue_pawn from '../assets/blue-pawn.png'
import logo from '../assets/logo1.png'

import '../css-files/Home.css'

const Home = () => {
    return (
        <>
            <div className="home-container">
                <div className="wrapper">
                    <div className="first">
                        <div className="lft">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="rht">
                            <span>How To Play</span>
                            <span>About Creator</span>
                            <span>GitHub</span>
                        </div>
                    </div>
                    <div className="second">
                        <h1>Play Ludo with <span>Friends Anywhere!</span></h1>
                        <b>Real-time multiplayer fun. No downloads required</b>
                        <div className="btns">
                            <button className='create-btn'>Create Lobby</button>
                            <button className='join-btn'>Join Lobby</button>
                        </div>
                    </div>
                    <div className="third">
                        2025 Ludo | credits
                    </div>
                    <div className="dice-img">
                        <img src={dice} alt="dice image" />
                    </div>
                    <img src={red_pawn} alt="red pawn image" className="red" />
                    <img src={green_pawn} alt="green pawn image" className="green" />
                    <img src={yellow_pawn} alt="yellow pawn image" className="yellow" />
                    <img src={blue_pawn} alt="blue pawn image" className="blue" />
                </div>
            </div>
        </>
    )
}

export default Home
