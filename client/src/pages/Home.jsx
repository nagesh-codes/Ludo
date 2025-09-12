import React from 'react'
import '../css-files/Home.css'

const Home = () => {
    return (
        <>
            <div className="home-container">
                <div className="wrapper">
                    <div className="first">
                        <div className="lft">
                            dice logo
                        </div>
                        <div className="rht">
                            <span>How To Play</span>
                            <span>About Creator</span>
                            <span>GitHub</span>
                        </div>
                    </div>
                    <div className="second">
                        <h1>Play Ludo with Friends Anywhere!</h1>
                        <b>Real-time multiplayer fun. No downloads required</b>
                        <div className="btns">
                            <button>Create Lobby</button>
                            <button>Join Lobby</button>
                        </div>
                    </div>
                    <div className="third">
                        2025 Ludo | credits
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
