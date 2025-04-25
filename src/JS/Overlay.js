import React from 'react'

import { GAME_LOST, GAME_WON } from './Constants'

//=========================================================================================================================================================================

//The overlay for game end
function Overlay({ resetGame, gameResult, wordToGuess, guessNumber }) {
    return (
        <div className="overlay">
            <div className="overlay-content">
                <h2>Game Over! You {gameResult ? GAME_WON : GAME_LOST}!</h2>
                <h2>The word was: {wordToGuess}</h2>
                {gameResult && <h2>Number of Guesses: {guessNumber + 1}</h2>}
                <button onClick={resetGame}>New Game</button>
            </div>
        </div>
    )
}

//=========================================================================================================================================================================

export default Overlay
