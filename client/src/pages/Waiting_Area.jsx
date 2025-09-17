import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import QRCode from 'qrcode';
import '../css-files/Waiting_Area.css';

const Waiting_Area = () => {
  const maxplayer = sessionStorage.getItem('maxPlayer') || 4
  const [pla_name, setPla_name] = useState(['Nagesh Gh', 'mahesh c']);

  useEffect(() => {
    for (let i = 0; i < maxplayer - 1; i++) {
      pla_name.push(NaN);
    }
    // pla_name.
    QRCode.toCanvas(document.getElementById("canvas"), window.location.origin, {
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

  }, [])

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
            <button className="shr-btn">
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
