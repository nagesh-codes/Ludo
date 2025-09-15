import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import playing_ludo from '../assets/playing-ludo.png'
import '../css-files/Create_Room.css'

const Create_Room = () => {
  const [username, setUsername] = useState('');
  const [maxplayer, setMaxplayer] = useState(2);
  const [clr, setClr] = useState('r')
  const [roomID, setRoomID] = useState('Generating...');
  const navigate = useNavigate();


  console.log(maxplayer);


  return (
    <div className="create-container">
      <div className="wrapper">
        <div className="main-heading">
          Create a New Room
        </div>
        <div className="middle">
          <div className="left">
            <div className='info'>
              Enter your name, pick 2–4 players, choose the color, and get a unique Room ID to share. Friends can join instantly for smooth, real-time Ludo fun!
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
              <label>Choose Players</label>
              <div className="player">
                <div className={`${maxplayer === 2 ? 'select' : 'p2'}`} onClick={() => setMaxplayer(2)}>2</div>
                <div className={`${maxplayer === 3 ? 'select' : 'p2'}`} onClick={() => setMaxplayer(3)}>3</div>
                <div className={`${maxplayer === 4 ? 'select' : 'p2'}`} onClick={() => setMaxplayer(4)}>4</div>
              </div>
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
                value={roomID}
                readOnly
              />
            </div>
            <div className="fields btns">
              <button type='submit'>Create Room</button>
              <button type='submit' onClick={() => { navigate("/") }}>Home</button>
            </div>
            <p>You Will Get A Sharable Link.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create_Room
