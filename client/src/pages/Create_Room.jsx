import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../components/socketProvider';
import Loader from './Loader'
import { toast } from 'react-toastify';
import '../css-files/Create_Room.css'

const Create_Room = () => {
  const [username, setUsername] = useState('');
  const [maxplayer, setMaxplayer] = useState(2);
  const [clr, setClr] = useState('r')
  const [roomID, setRoomID] = useState('Generating...');
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false)
  const { socket, connected } = useSocket();


  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoader(true);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('maxplayer', maxplayer);
    socket.emit("CreateNewRoom", { username, roomID, clr, maxplayer });
  }

  useEffect(() => {
    if (!socket || !connected) return;
    socket.on('takeID', (dt) => {
      sessionStorage.setItem('roomid', dt);
      setRoomID(dt);
    })

    socket.emit('GenerateNewRoomID');

    socket.on('RoomCreated', () => {
      toast.success('Room Successfully Created');
      navigate("/waiting-area")
    })

    return () => {
      socket.off('takeID');
      socket.off('RoomCreated');
    }

  }, [socket, connected]);

  return (
    <div className="create-container">
      {showLoader ? <Loader /> : ''}
      <div className={showLoader ? 'hide' : 'wrapper'}>
        <div className="main-heading">
          Create a New Room
        </div>
        <div className="middle">
          <div className="left">
            <div className='info'>
              Enter your name, pick 2–4 players, choose the color, and get a unique Room ID to share. Friends can join instantly for smooth, real-time Ludo fun!
            </div>
          </div>
          <form className="right" onSubmit={handleSubmit}>
            <div className="fields">
              <label>Your Name</label>
              <input
                type="text"
                placeholder='Enter Your Name'
                value={username}
                onInput={e => setUsername(e.target.value)}
                required
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create_Room
