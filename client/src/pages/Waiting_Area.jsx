import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import QRCode from 'qrcode';
import '../css-files/Waiting_Area.css';
import { useSocket } from '../components/socketProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Waiting_Area = () => {
  const maxplayer = sessionStorage.getItem('maxplayer');
  const [username, setUsername] = useState([sessionStorage.getItem('username')])
  const [pla_name, setPla_name] = useState(username);
  const [roomid, setRoomid] = useState(sessionStorage.getItem('roomid'));
  const { socket, connected } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('username') || !sessionStorage.getItem('roomid')) {
      navigate("/");
    }

    for (let i = 0; i < maxplayer - 1; i++) {
      pla_name.push(NaN);
    }

    QRCode.toCanvas(document.getElementById("canvas"), window.location.origin + '/join-room/' + roomid, {
      width: window.innerWidth < 600 ? 180 : 330,
      color: {
        dark: "#ffffff",
        light: "#1ec4d9"
      }
    }, function (er) {
      if (er) {
        return;
      }
    });

  }, []);

  useEffect(() => {
    if (!socket || !connected) return;
    socket.emit('ChangeSocketID', { roomID: roomid, username });
    socket.emit('GetPlayersStatus', { roomID: roomid });

    socket.on('TakePlayersStatus', (dt) => {
      setPla_name(dt.data);
      console.log(dt)
      if (dt.isMatchStarted) {
        navigate('/main-game');
      }
    });

    socket.on('GoToHome', () => {
      navigate("/");
      window.location.reload();
    });

    socket.on('UserJoined', (dt) => {
      setPla_name(dt.data);
      if (dt.isMatchStarted) {
        toast.success("All Friends Are Joined");
        setTimeout(() => {
          navigate('/main-game');
        }, 1200);
      } else {
        toast.success('Friend joind');
      }
    })

    return () => {
      socket.off('TakePlayersStatus');
      socket.off('UserJoined');
      socket.off('GoToHome');
    }
  }, [socket, connected])

  return (
    <div className="waiting-container">
      <div className="wrapper">
        <div className="heading">Lobby Name</div>
        <div className="middle">
          <div className="left">
            <div className="player-area">
              <p>Players</p>
              <div className="player-status">
                {renderPlayers(maxplayer, pla_name)}
              </div>
            </div>
            <div className="info">
              Hold tight! We’re setting up your game room. This screen will stay up until all players have joined. Once everyone is connected, the game will begin automatically. Get ready for some fun!
            </div>
          </div>
          <div className="right">
            <div className="qrcode">
              <canvas id='canvas'></canvas>
            </div>
            <button className="shr-btn" style={{ width: window.innerWidth < 600 ? '180px' : '330px' }}>
              Invite Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
function renderPlayers(maxplayer, pla_name) {
  const players = [];
  for (let i = 0; i < maxplayer; i++) {
    const hasName = pla_name[i] && pla_name[i].trim() !== '';
    players.push(
      <div className="pla" key={i}>
        <div className={hasName ? 'ready' : 'hide'}>
          <Avatar
            round={true}
            name={pla_name[i]}
            size={window.innerWidth < 600 ? 40 : 50}
            textSizeRatio={2.5}
            className="avt"
            color="#7c5eff"
          />
          <div className="pl-st">
            <span>{pla_name[i]}</span>
            <span>Ready</span>
          </div>
        </div>
        <div className={hasName ? 'hide' : 'not-ready'}>
          <div className="inner">Waiting for player</div>
        </div>
      </div>
    );
  }
  return players;
}


export default Waiting_Area;
