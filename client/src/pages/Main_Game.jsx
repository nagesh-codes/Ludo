import React, { useEffect, useState } from 'react'
import Loader from './Loader.jsx'
import '../css-files/Main_Game.css'
import Dice from './Dice.jsx';
import { useSocket } from '../components/socketProvider.jsx';

const Main_Game = () => {
  const redPath = [
    [7, 2], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
    [6, 7], [5, 7], [4, 7], [3, 7], [2, 7], [1, 7],
    [1, 8], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9],
    [7, 10], [7, 11], [7, 12], [7, 13], [7, 14], [7, 15],
    [8, 15], [9, 15],
    [9, 14], [9, 13], [9, 12], [9, 11], [9, 10],
    [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
    [15, 8], [15, 7], [14, 7],
    [13, 7], [12, 7], [11, 7], [10, 7],
    [9, 6], [9, 5], [9, 4], [9, 3], [9, 2], [9, 1], [8, 1],
    [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7]
  ];

  const greenPath = [
    [2, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9],
    [7, 10], [7, 11], [7, 12], [7, 13], [7, 14], [7, 15],
    [8, 15], [9, 15],
    [9, 14], [9, 13], [9, 12], [9, 11], [9, 10],
    [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
    [15, 8], [15, 7], [14, 7],
    [13, 7], [12, 7], [11, 7], [10, 7],
    [9, 6], [9, 5], [9, 4], [9, 3], [9, 2], [9, 1], [8, 1], [7, 1],
    [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
    [6, 7], [5, 7], [4, 7], [3, 7], [2, 7], [1, 7],
    [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]
  ];

  const yellowPath = [
    [9, 14], [9, 14], [9, 13], [9, 12], [9, 11], [9, 10],
    [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
    [15, 8], [15, 7], [14, 7],
    [13, 7], [12, 7], [11, 7], [10, 7],
    [9, 6], [9, 5], [9, 4], [9, 3], [9, 2], [9, 1], [8, 1], [7, 1],
    [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
    [6, 7], [5, 7], [4, 7], [3, 7], [2, 7], [1, 7],
    [1, 8], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9],
    [7, 10], [7, 11], [7, 12], [7, 13], [7, 14], [7, 15],
    [8, 15], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [8, 9]
  ]

  const bluePath = [
    [14, 7], [14, 7],
    [13, 7], [12, 7], [11, 7], [10, 7],
    [9, 6], [9, 5], [9, 4], [9, 3], [9, 2], [9, 1], [8, 1], [7, 1],
    [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],
    [6, 7], [5, 7], [4, 7], [3, 7], [2, 7], [1, 7],
    [1, 8], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9],
    [7, 10], [7, 11], [7, 12], [7, 13], [7, 14], [7, 15],
    [8, 15], [9, 15],
    [9, 14], [9, 13], [9, 12], [9, 11], [9, 10],
    [10, 9], [11, 9], [12, 9], [13, 9], [14, 9], [15, 9],
    [15, 8], [14, 8], [13, 8], [12, 8], [11, 8], [10, 8], [9, 8]
  ]

  const red_home = [[3, 2], [3, 5], [5, 2], [5, 5]];
  const green_home = [[3, 11], [3, 14], [5, 11], [5, 14]];
  const blue_home = [[12, 2], [12, 5], [14, 2], [14, 5]];
  const yellow_home = [[12, 11], [12, 14], [14, 11], [14, 14]];

  const [players_info, setPlayers_info] = useState([{ userid: 'asdf', name: "nagesh G", position: [0, 0, 0, 0], clr: 'red', disableDice: true }]);
  const [showLoader, setShowLoader] = useState(false);
  const [diceValue, setDiceValue] = useState(0);
  const [diceIndex, setDiceIndex] = useState(0);
  const [diceDisable, setDiceDisable] = useState(false);
  const [roomID, setRoomID] = useState(sessionStorage.getItem('roomid'));
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const { socket, connected } = useSocket();

  const travers = (pawn_clr, ind, end_position, increment = true) => {
    document.querySelector(`.${pawn_clr}-pawn-${ind}`).style.gridColumnStart = redPath[i][1];
    document.querySelector(".red-pawn-1").style.gridRowStart = redPath[i][0];
    i++;
    if (i < redPath.length) {
      setTimeout(() => {
        travers((pawn_clr, ind, end_position, increment = increment ? true : false));
      }, 1000)
    }
  }

  useEffect(() => {
    console.log("diceValue =", diceValue);
  }, [diceValue]);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShowLoader(false), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    if (!socket || !connected) return;
    socket.emit('GetGameStatus', { roomID, username });

    socket.on('TakeGameStatus', (data) => {
      setPlayers_info(data.players_info);
    });

    return () => {
      socket.off('TakeGameStatus');
    }
  }, [socket, connected]);

  return (
    <div className='game-container'>
      {showLoader ? <Loader txt="designing the game area." /> : ''}
      <div className={`${showLoader ? 'hide' : 'wrapper'}`}>
        <div className="main-heading">Ludo Made By Nagesh</div>
        <div className="middle">
          <div className="left">
            <div className="board">
              {addDivs()}
              {addPlayersInfo(diceValue, setDiceValue, diceIndex, diceDisable, players_info)}
            </div>
            <button className="leave-btn">Leave The Game</button>
          </div>
          <div className="right">
            <div className="chat-container">
              <div className="chat-area">
                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h 💕</p>
                </div>

                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>


                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>
                <div className="rght-txt">
                  <h3>you</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
                </div>

              </div>
              <div className="input-area">
                <input type="text" placeholder='Message' />
                <div className="send-btn">
                  <i className="fa-solid fa-paper-plane"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function addDivs() {
  const divs = [];
  let ind = 0;
  for (let i = 1; i <= 15; i++) {
    for (let j = 1; j <= 15; j++) {
      divs.push(
        <div
          key={`${i}-${j}`}
          className={`
                      ${(i > 6 && i < 10) || (j > 6 && j < 10) ? (i < 7 && i > 1 && j == 8) || (i == 2 && j == 9) ? 'green-path' : (i == 8 && j > 1 && j < 7) || (i == 7 && j == 2) ? 'red-path' : (i > 9 && i <= 14 && j == 8) || (i == 14 && j == 7) ? 'blue-path' : (i == 8 && j > 9 && j <= 14) || (i == 9 && j == 14) ? 'yellow-path' : 'inner-board-div' : ''}
                      `}
          style={{ gridRowStart: i, gridColumnStart: j }}
        >
          {i == 1 && j == 8 ? <i className="fa-solid fa-arrow-down green-arrow icon"></i> : ''}
          {i == 15 && j == 8 ? <i className="fa-solid fa-arrow-up blue-arrow icon"></i> : ''}
          {i == 8 && j == 1 ? <i className="fa-solid fa-arrow-right red-arrow icon"></i> : ''}
          {i == 8 && j == 15 ? <i className="fa-solid fa-arrow-left yellow-arrow icon"></i> : ''}

          {i == 3 && j == 7 ? <i className="fa-regular fa-star star icon"></i> : ''}
          {i == 13 && j == 9 ? <i className="fa-regular fa-star star icon"></i> : ''}
          {i == 9 && j == 3 ? <i className="fa-regular fa-star star icon"></i> : ''}
          {i == 7 && j == 13 ? <i className="fa-regular fa-star star icon"></i> : ''}
        </div>
      );
    }
  }
  return divs;
}

function addPlayersInfo(diceValue, setDiceValue, diceIndex, diceDisable, players_info) {
  const divs = [];
  const colors = ['red', 'green', 'yellow', 'blue'];
  players_info.forEach((user, ind) => {
    for (let j = 0; j < 4; j++) {
      divs.push(
        <div key={`${user.clr} + ${j}`} className={`${user.clr}-pawn ${user.clr}-pawn-${j + 1} pawns pointer`}></div>
      )
    };

    divs.push(
      <div key={user.clr} className={`${user.clr}-dice-area dice-area`} onClick={() => { setDiceValue(Math.floor(Math.random() * 6) + 1) }}>
        {diceIndex === ind ? <Dice number={diceValue} isDisable={diceDisable} /> : ''}
      </div>
    );

    divs.push(
      <div className={`${user.clr}-player player-area`} key={ind}>
        <div className="player-info">
          <div className="player-name">{user.name}</div>
        </div>
      </div>
    );

    const index = colors.findIndex(cl => cl === user.clr);
    colors[index] = '';
  });

  colors.forEach((clr, ind) => {
    if (clr !== '') {
      divs.push(
        <div className={`${clr}-player player-area`} key={ind + 'not-in-list'}>
          <div className="player-info"></div>
        </div>
      )
    }
  })

  return divs;
}

export default Main_Game
