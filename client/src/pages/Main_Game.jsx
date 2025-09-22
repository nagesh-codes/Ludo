import React, { useEffect, useState } from 'react'
import Loader from './Loader.jsx'
import '../css-files/Main_Game.css'
import Dice from './Dice.jsx';

const Main_Game = () => {
  const redPath = [[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 8]];
  const pawn = [1, 2, 3, 4];
  const [playersDivInfo, setPlayersDivInfo] = useState(['red', 'green', 'yellow', 'blue']);
  const [playersName, setPlayersName] = useState(['player', 'player', 'player 3', 'player 4']);
  const [howMuchPlayer, setHowMuchPlayer] = useState(['red', 'green', 'blue', 'yellow'])
  const [showLoader, setShowLoader] = useState(true);
  const [diceValue, setDiceValue] = useState(0);
  const [diceIndex, setDiceIndex] = useState(0);
  const [diceDisable, setDiceDisable] = useState(false);

  useEffect(() => {
    console.log("diceValue =", diceValue);
    setTimeout(()=>{
      
      setDiceIndex(prev => (prev + 1 == 5 ? 0 : prev + 1));
    },120);
}, [diceValue]);

  useEffect(() => {
    let i = 0;
    // trav(i);

    function trav(i) {
      document.querySelector(".red-pawn-1").style.gridColumnStart = redPath[i][1];
      document.querySelector(".red-pawn-1").style.gridRowStart = redPath[i][0];
      i++;
      if (i < redPath.length) {
        setTimeout(() => {
          trav(i);
        }, 1000)
      } else {
        i = 0;
        // trav(i);
      }
    }
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='game-container'>
      {showLoader ? <Loader txt="designing the game area." /> : ''}
      <div className={`${showLoader ? 'hide' : 'wrapper'}`}>
        <div className="main-heading">Ludo Made By Nagesh</div>
        <div className="middle">
          <div className="left">
            <div className="board">
              {addDivs()}
              {playersDivInfo.map((pla, ind) => {
                return (
                  <div className={`${pla}-player player-area`} key={ind}>
                    <div className="player-info">
                      <div className="player-name">{playersName[ind]}</div>
                    </div>
                  </div>
                )
              })}
              {addPawns(howMuchPlayer, diceValue, setDiceValue, diceIndex, diceDisable)}
            </div>
            <button className="leave-btn">Leave The Game</button>
          </div>
          <div className="right">
            <div className="chat-container">
              <div className="chat-area">
                <div className="lft-txt">
                  <h3>Nagesh</h3>
                  <p>hello akjsdhf ajsd fhalksjd fhalsdjf halskjd fhalskdjf halskdjf hlsakjd fhalsjdf h</p>
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

function addPawns(howMuchPlayer, diceValue, setDiceValue, diceIndex, diceDisable) {

  const pawns = []
  howMuchPlayer.forEach(clr => {
    for (let j = 0; j < 4; j++) {
      pawns.push(
        <div key={`${clr} + ${j}`} className={`${clr}-pawn ${clr}-pawn-${j + 1} pawns`}></div>
      )
    }
  });
  howMuchPlayer.forEach((clr, ind) => {
    pawns.push(
      <div key={clr} className={`${clr}-dice-area dice-area`} onClick={() => { setDiceValue(Math.floor(Math.random() * 6) + 1) }}>
        {diceIndex === ind ? <Dice number={diceValue} isDisable={diceDisable} /> : ''}
      </div>
    )
  });
  return pawns;
}

export default Main_Game
