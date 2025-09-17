import React, { useEffect, useState } from 'react'
import '../css-files/Main_Game.css'

const Main_Game = () => {
  const pathCoordinates = [[1, 7], [2, 7], [3, 7]];
  const pawn = [1, 2, 3, 4];
  const [playersDivInfo, setPlayersDivInfo] = useState(['red', 'green', 'yellow', 'blue']);
  const [playersName, setPlayersName] = useState(['player 1', 'player 2', 'player 3', 'player 4']);

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
                      <div className="player-info">{playersName[ind]}</div>
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
  for (let i = 1; i <= 13; i++) {
    for (let j = 1; j <= 13; j++) {
      divs.push(
        <div
          key={`${i}-${j}`}
          className={`
                      ${(i > 5 && i < 9) || (j > 5 && j < 9) ? 'inner-board-div' : ''} 
                      ${(i < 6 && i >= 1 && j == 7) || (i == 1 && j == 8) ? 'green-path' : ''} 
                      ${(i > 8 && i <= 13 && j == 7) || (i == 13 && j == 6) ? 'blue-path' : ''}
                      ${(i == 7 && j >= 1 && j < 6) || (i == 6 && j == 1) ? 'red-path' : ''}
                      ${(i == 7 && j > 8 && j <= 13) || (i == 8 && j == 13) ? 'yellow-path' : ''}
                      `}
          style={{ gridRowStart: i, gridColumnStart: j }}
        ></div>
      );
    }
  }
  return divs;
}

export default Main_Game
