import React from 'react'

function Overlay({ onNewGame, wordToGuess, currentLineIndex }) {
    return (
        <div className="overlay">
            <div className="overlay-content">
                <h2>Game Over!</h2>
                <h2>The word was: {wordToGuess}</h2>
                <h2>Number of Guesses: {currentLineIndex + 1}</h2>
                <button onClick={onNewGame}>New Game</button>
            </div>
        </div>
    )
}

export default Overlay
