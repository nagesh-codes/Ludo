import React, { useEffect, useState } from 'react'
import '../css-files/Main_Game.css'

const Main_Game = () => {
  const redPath = [[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7]];
  const pathCoordinates = [[1, 7], [2, 7], [3, 7]];
  const pawn = [1, 2, 3, 4];
  const [playersDivInfo, setPlayersDivInfo] = useState(['red', 'green', 'yellow', 'blue']);
  const [playersName, setPlayersName] = useState(['play Nagesh', 'player 2', 'player 3', 'player 4']);

  useEffect(() => {
    let i = 0;
    trav(i);

    function trav(i) {
      document.querySelector(".green-player .pawn1").style.gridColumnStart = redPath[i][1];
      document.querySelector(".green-player .pawn1").style.gridRowStart = redPath[i][0];
      i++;
      if (i < redPath.length) {
        // setTimeout(() => {
        //   trav(i);
        // }, 1000)
      }
    }
  }, []);

  return (
    <div className='game-container'>
      <div className="wrapper">
        <div className="main-heading">Ludo Made By Nagesh</div>
        <div className="middle">
          <div className="left">
            <div className="board">
              {addDivs(pathCoordinates)}
              {playersDivInfo.map((pla, ind) => {
                return (
                  <div className={`${pla}-player player-area`} key={ind}>
                    <div className="player">
                      <div className="player-info">
                        <div className="dice-area">🎲</div>
                        <div className="player-name">{playersName[ind]}</div>
                      </div>
                      <div className="all-pawns">
                        {pawn.map((i) => {
                          return (
                            <div className={`pawn${i} pawn`} key={i}></div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="right">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore in, molestiae assumenda incidunt officiis, obcaecati ipsam soluta magni, dolores quod nobis aliquam sint quis amet. Necessitatibus minima distinctio unde omnis.
          </div>
        </div>
      </div>
    </div>
  )
}

function addDivs(pathCoordinates) {
  const divs = [];
  let ind = 0;
  for (let i = 1; i <= 15; i++) {
    for (let j = 1; j <= 15; j++) {
      divs.push(
        <div
          key={`${i}-${j}`}
          className={`
                      ${(i > 6 && i < 10) || (j > 6 && j < 10) ? 'inner-board-div' : ''} 
                      ${(i < 7 && i > 1 && j == 8) || (i == 2 && j == 9) ? 'green-path' : ''} 
                      ${(i > 9 && i <= 14 && j == 8) || (i == 14 && j == 7) ? 'blue-path' : ''}
                      ${(i == 8 && j > 1 && j < 7) || (i == 7 && j == 2) ? 'red-path' : ''}
                      ${(i == 8 && j > 9 && j <= 14) || (i == 9 && j == 14) ? 'yellow-path' : ''}
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

export default Main_Game
