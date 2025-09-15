import React, { useEffect, useState } from 'react'
import '../css-files/Join_Room.css'
import { useNavigate, useParams } from 'react-router-dom';

const Join_Room = () => {
    const [username, setUsername] = useState('');
    const [clr, setClr] = useState('r');
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();
    const [txt, setTxt] = useState('Enter RoomID Provided By Your Friend.');
    const { roomid } = useParams();
    const [disableBtn, setDisableBtn] = useState(false);

    useEffect(()=>{
        if(roomid){
            setRoomID(roomid);
            setDisableBtn(true);
            setTxt("You Are Invited By Your Friend, The RoomId is Automaticaly Filled.");
        }
    },[])

    return (
            <div className="join-container">
                <div className="wrapper">
                    <div className="main-heading">Join The Room</div>
                    <div className="middle">
                        <div className="left">
                            <div className="info">
                                Enter a Name ,room code , and select Your fav color to join your friends and dive straight into the action. Grab your spot on the board, roll the dice, and let the fun begin—no setup required!
                            </div>
                        </div>
                        <div className="right">
                            <div className="fields">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Your Name'
                                    value={username}
                                    onInput={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="fields">
                                <label>Choose Your Fav Color</label>
                                <div className="player-color">
                                    <div onClick={() => { setClr("r") }} className={`red ${clr === 'r' ? 'clr-select' : ''}`}></div>
                                    <div onClick={() => { setClr("b") }} className={`blue ${clr === 'b' ? 'clr-select' : ''}`}></div>
                                    <div onClick={() => { setClr("y") }} className={`yellow ${clr === 'y' ? 'clr-select' : ''}`}></div>
                                    <div onClick={() => { setClr("g") }} className={`green ${clr === 'g' ? 'clr-select' : ''}`}></div>
                                </div>
                            </div>
                            <div className="fields">
                                <label>Room ID</label>
                                <input
                                    type="text"
                                    placeholder='Enter Your Roomid'
                                    value={roomID}
                                    onInput={(e) => { setRoomID(e.target.value) }}
                                    disabled={disableBtn}
                                />
                                <h4>{txt}</h4>
                            </div>
                            <div className="fields btns">
                                <button type='submit'>Join Room</button>
                                <button type='submit' onClick={() => { navigate("/") }}>Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Join_Room
