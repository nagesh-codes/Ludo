import React from 'react'
import dice from '../assets/dice.png'
import red_pawn from '../assets/red-pawn.png'
import yellow_pawn from '../assets/yellow-pawn.png'
import green_pawn from '../assets/green-pawn.png'
import blue_pawn from '../assets/blue-pawn.png'
import logo from '../assets/logo1.png'
import '../css-files/Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    return (
            <div className="home-container">
                <div className="wrapper">
                    <div className="first">
                        <div className="lft">
                            <img src={logo} alt="logo" draggable="false" />
                        </div>
                        <div className="rht">
                            <span>How To Play</span>
                            <span><a href="https://nageshdev.online" target='_blank'>About Creator</a></span>
                            <span><a href="https://github.com/nagesh-codes/Ludo" target='_blank'>GitHub</a></span>
                        </div>
                    </div>
                    <div className="second">
                        <h1>Play Ludo with <span>Friends Anywhere!</span></h1>
                        <b>Real-time multiplayer fun. No downloads required</b>
                        <div className="btns">
                            <button className='create-btn' onClick={() => navigate("/create-room")}>Create Lobby</button>
                            <button className='join-btn' onClick={() => navigate("/join-room")}>Join Lobby</button>
                        </div>
                    </div>
                    <div className="third">
                        2025 Ludo | credits
                    </div>
                    <div className="dice-img">
                        <img src={dice} alt="dice image" draggable="false" />
                    </div>
                    <img src={red_pawn} alt="red pawn image" className="red" draggable="false" />
                    <img src={green_pawn} alt="green pawn image" className="green" draggable="false" />
                    <img src={yellow_pawn} alt="yellow pawn image" className="yellow" draggable="false" />
                    <img src={blue_pawn} alt="blue pawn image" className="blue" draggable="false" />
                </div>
            </div>
    )
}

export default Home
