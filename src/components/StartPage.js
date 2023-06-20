import React from 'react'
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

export const StartPage = (() => {
  return (
    <div className="start-container">
      <Link to="/quiz">
        <button type="button" className="StartButton">
          <div className="Text">
            <h1>
What heter djuret?
            </h1>

            <h2>
¿Como se llama el animal?
            </h2>
            <p>Börja spela empieza a jugar</p>
          </div>
          <div className="animations">
            <Player
              src="https://assets6.lottiefiles.com/packages/lf20_lb6Gsk.json"
              className="player"
              loop
              autoplay
              speed={1}
              style={{
                width: '100%',
                height: '10rem',
                top: 0,
                left: 0
              }} />

            <Player
              src="https://assets6.lottiefiles.com/packages/lf20_lc46h4dr.json"
              className="player"
              loop
              autoplay
              speed={1}
              style={{
                width: '100%',
                height: '10rem',
                top: 0,
                left: 0
              }} />
          </div>
        </button>
      </Link>

    </div>
  )
})