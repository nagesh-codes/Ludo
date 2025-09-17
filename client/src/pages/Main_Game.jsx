import React, { useEffect } from 'react'
import '../css-files/Main_Game.css'

const Main_Game = () => {

  return (
    <div className='game-container'>
      <div className="wrapper">
        <div className="main-heading">Ludo Made By Nagesh</div>
        <div className="middle">
          <div className="left">
            <div className="board">
              {addDivs()}
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

function addDivs() {
  const divs = []
  for (let i = 0; i < 224; i++) {
    divs.push(
      <div key={i + 1} className='inner-board-div'></div>
    )
  }
  return divs;
}

export default Main_Game
