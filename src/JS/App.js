import React, { useRef, useState } from 'react'

import Error from './ErrorHandling.js'
import Footer from './Footer.js'
import Overlay from './Overlay.js'
import Tile from './Tile.js'
import UserInput from './UserInput.js'
import WordBank from './WordBank.js'

import { GuessCheck } from './GuessCheck.js'

import { BLANK_STRING, EMPTY_STATUS, LETTER_COUNT_ERROR, LINE_COUNT, TILE_COUNT, WORD_LIST_ERROR } from './Constants'

import '../CSS/Styles.css'

//=========================================================================================================================================================================

//App function to run the game
function App() {
    const [animations, setAnimations] = useState({ shake: null, pop: null, flip: null, bounce: null, boardClear: null })
    const [board, setBoard] = useState(Array.from({ length: LINE_COUNT }, () => Array(TILE_COUNT).fill({ frontLetter: BLANK_STRING, backLetter: BLANK_STRING, borderStatus: false, guessStatus: EMPTY_STATUS })))
    const [canInput, setCanInput] = useState(true)
    const [currentTile, setCurrentTile] = useState({ row: 0, col: 0 })
    const [error, setError] = useState({ message: BLANK_STRING, toggle: null })
    const [gameResult, setGameResult] = useState(null)
    const [keyStatuses, setKeyStatuses] = useState({})
    const [showOverlay, setShowOverlay] = useState(null)
    const { storedWords, wordToGuess, pickRandomWord } = WordBank()

    const tilesFlippedRef = useRef(0)
    
    //=========================================================================================================================================================================
    
    //Updating the game board
    const updateBoard = (newValue, addedLetter, checkGuess) => {
        setBoard(prevBoard => {
            const newBoard = [...prevBoard]
            const row = currentTile.row
            const col = addedLetter ? currentTile.col : currentTile.col - 1

            newBoard[row][col] = {
                frontLetter: newValue ? newValue : newValue,
                backLetter: newValue ? newValue : newValue,
                borderStatus: addedLetter,
                guessStatus: EMPTY_STATUS,
            }

            if (checkGuess) {
                newBoard[row] = checkGuess
            }

            return newBoard
        })
    }

    //=========================================================================================================================================================================

    //Handling a valid letter press
    const handleLetterPress = (letter) => {
        if (currentTile.col >= TILE_COUNT) {
            return
        }

        updateBoard(letter, true, null)
        setAnimations(prevAnimations => ({ ...prevAnimations, pop: { row: currentTile.row, col: currentTile.col, shouldPop: true }, flip: null }))
        setCurrentTile(prevTile => ({ ...prevTile, col: prevTile.col + 1 }))
    }

    //=========================================================================================================================================================================

    //Handling a valid backspace press
    const handleBackspacePress = () => {
        if (currentTile.col <= 0) {
            return
        }

        updateBoard(BLANK_STRING, false, null)
        setAnimations(prevAnimations => ({ ...prevAnimations, pop: { row: currentTile.row, col: currentTile.col - 1, shouldPop: false }, flip: null }))
        setCurrentTile(prevTile => ({ ...prevTile, col: prevTile.col - 1 }))
    }

    //=========================================================================================================================================================================

    //Handling a valid enter press
    const handleEnterPress = () => {
        const userGuess = board[currentTile.row].map(tile => tile.frontLetter).join(BLANK_STRING)
        let checkGuess = null

        if (userGuess.length !== TILE_COUNT) {
            setAnimations(prevAnimations => ({ ...prevAnimations, shake: { row: currentTile.row, shouldShake: true, onComplete: handleShakeAnimationComplete }}))
            setError(prevError => ({ message: LETTER_COUNT_ERROR, toggle: !prevError.toggle }))
            return
        }

        if (!storedWords.includes(userGuess)) {
            setAnimations(prevAnimations => ({...prevAnimations, shake: { row: currentTile.row, shouldShake: true, onComplete: handleShakeAnimationComplete }}))
            setError(prevError => ({ message: WORD_LIST_ERROR, toggle: !prevError.toggle }))
            return
        }

        setCanInput(false)
        checkGuess = GuessCheck(userGuess, wordToGuess)

        updateBoard(null, null, checkGuess)
        setAnimations(prevAnimations => ({ ...prevAnimations, flip: { row: currentTile.row, hasFlipped: false, onComplete: (row) => handleFlipAnimationComplete(row, checkGuess, userGuess) }}))
    }

    //=========================================================================================================================================================================

    //Handling the finishing of a line shake animation
    const handleShakeAnimationComplete = (row) => {
        setAnimations(prevAnimations => ({ ...prevAnimations, shake: { row, toShake: false}}))
    }

    //=========================================================================================================================================================================
    
    //Handling the finishing of a line flip animation
    const handleFlipAnimationComplete = (row, checkGuess, userGuess) => {
        setAnimations(prevAnimations => ({ ...prevAnimations, flip: { row, hasFlipped: true }}))

        setKeyStatuses(prevKeyStatuses => {
            const newKeyStatuses = { ...prevKeyStatuses }

            checkGuess.forEach(({ letter, guessStatus }) => {
                if (!newKeyStatuses[letter] || guessStatus.priority > newKeyStatuses[letter].priority) {
                    newKeyStatuses[letter] = guessStatus
                }
            })

            return newKeyStatuses
        })

        if (userGuess === wordToGuess) {
            setGameResult(true)
            setAnimations(prevAnimations => ({ ...prevAnimations, bounce: { row: currentTile.row, onComplete: handleBounceAnimationComplete }}))
        } else if (row >= LINE_COUNT - 1) {
            setGameResult(false)
            setShowOverlay(true)
        } else {
            setCurrentTile({ row: currentTile.row + 1, col: 0})
            setCanInput(true)
        }
    }

    //=========================================================================================================================================================================

    //Handling the finishing of a line bounce animation
    const handleBounceAnimationComplete = () => {
        setShowOverlay(true)
    }

    //=========================================================================================================================================================================

    //Handling the reset game trigger
    const handleResetGame = () => {
        setShowOverlay(false)
        setAnimations({ shake: null, pop: null, flip: null, bounce: null, boardClear: { row: currentTile.row, shouldClear: true, onComplete: handleBoardClearAnimationComplete }})
    }

    //=========================================================================================================================================================================

    //Handling the finishing of the board clearing animation
    const handleBoardClearAnimationComplete = () => {
        setAnimations(prev => ({ ...prev, boardClear: null }))
        setBoard(Array.from({ length: LINE_COUNT }, () => Array(TILE_COUNT).fill({ fontLetter: BLANK_STRING, backLetter: BLANK_STRING, borderStatus: false, guessStatus: EMPTY_STATUS })))
        setCurrentTile({ row: 0, col: 0 })
        setError({ message: BLANK_STRING, toggle: null})
        setGameResult(null)
        setKeyStatuses({})
        pickRandomWord()

        tilesFlippedRef.current = 0
        setCanInput(true)
    }

    //=========================================================================================================================================================================

    //HTML structure with properties of the full game
    return (
        <>
            {showOverlay && (
                <Overlay resetGame={handleResetGame} gameResult={gameResult} wordToGuess={wordToGuess} guessNumber={currentTile.row} />
            )}

            <h1 className='title'>Wordle Unlimited</h1>

            {wordToGuess && (
                <>
                    <div className='board'>
                        {board.map((row, rowIndex) =>
                            row.map((tile, colIndex) => (
                                <Tile
                                    key={`${rowIndex}-${colIndex}`}
                                    row={rowIndex}
                                    col={colIndex}
                                    tile={tile}
                                    animations={animations}
                                    tilesFlipped={tilesFlippedRef}
                                />
                            ))
                        )}
                    </div>
                </>
            )}

            <Error error={error} />
            <UserInput canInput={canInput} keyStatuses={keyStatuses} onLetterPress={handleLetterPress} onBackspacePress={handleBackspacePress} onEnterPress={handleEnterPress} />
            <Footer />
        </>
    )
}

//=========================================================================================================================================================================

export default App