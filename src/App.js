import React, { useState, useEffect } from 'react'

import Error from './ErrorHandling.js'
import FetchWords from './FetchWords'
import Line from './Line.js'
import UserInput from './UserInput.js'

import { BLANK_STRING, EMPTY_STATUS, LETTER_COUNT_ERROR, LINE_COUNT, TILE_COUNT, WORD_LIST_ERROR } from './Constants'

import './CSS/Styles.css'
import { GuessCheck } from './GuessCheck.js'

function App() {
    const [board, setBoard] = useState(
        Array.from({ length: LINE_COUNT }, () => Array(TILE_COUNT).fill({letter: BLANK_STRING, borderStatus: false, flippedStatus: false, guessStatus: EMPTY_STATUS}))
    )

    const [storedWords, setStoredWords] = useState([])
    const [wordToGuess, setWordToGuess] = useState(BLANK_STRING)
    const [currentTileIndex, setCurrentTileIndex] = useState(0)
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [errorMessage, setErrorMessage] = useState(BLANK_STRING)
    const [errorFlag, setErrorFlag] = useState(false)
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        const storedAPIWords = localStorage.getItem('wordleWords')

        if (storedAPIWords) {
            setStoredWords(JSON.parse(storedAPIWords))
        }
    }, [])

    useEffect(() => {
        if (storedWords.length > 0) {
            setWordToGuess(storedWords[Math.floor(Math.random() * storedWords.length)].toUpperCase())
        }
    }, [storedWords])

    const updateBoard = (newValue, increment = true) => {
        if (increment) {
            setBoard(prevBoard => {
                const newBoard = [...prevBoard]

                newBoard[currentLineIndex][currentTileIndex] = {
                    letter: newValue,
                    borderStatus: true,
                    guessStatus: EMPTY_STATUS
                }

                return newBoard
            })

            setCurrentTileIndex(prevIndex => prevIndex + 1)
        } else {
            setCurrentTileIndex(prevIndex => {
                const newIndex = prevIndex - 1

                setBoard(prevBoard => {
                    const newBoard = [...prevBoard]

                    newBoard[currentLineIndex][newIndex] = {
                        letter: newValue,
                        borderStatus: false,
                        guessStatus: EMPTY_STATUS    
                    }

                    return newBoard
                })

                return newIndex
            })
        }
    }

    const handleLetterPress = (key) => {
        if (currentTileIndex < TILE_COUNT) {
            updateBoard(key, true)
        }
    }

    const handleBackspacePress = () => {
        if (currentTileIndex > 0) {
            updateBoard(BLANK_STRING, false)
        }
    }

    const handleEnterPress = () => {
        const userGuess = board[currentLineIndex].map(tile => tile.letter).join(BLANK_STRING)

        if (userGuess.length !== TILE_COUNT) {
            setErrorMessage(LETTER_COUNT_ERROR)
            setErrorFlag(prev => !prev)
            return
        }

        if (!storedWords.includes(userGuess.toLowerCase())) {
            setErrorMessage(WORD_LIST_ERROR)
            setErrorFlag(prev => !prev)
            return
        }

        setBoard(prevBoard => {
            const newBoard = [...prevBoard]
            newBoard[currentLineIndex] = GuessCheck(userGuess, wordToGuess)

            return newBoard
        })

        if (userGuess === wordToGuess) {
            setGameOver(true)
        } else {
            setCurrentLineIndex(prevIndex => prevIndex + 1)
            setCurrentTileIndex(0)
        }
    }

    return (
        <>
            <FetchWords />
            <UserInput onLetterPress={handleLetterPress} onBackspacePress={handleBackspacePress} onEnterPress={handleEnterPress} gameOver={gameOver} />

            <h1 className='title'>Wordle</h1>

            {wordToGuess && (
                <>
                    <h2 className='word-to-guess'>
                        Random Word: {wordToGuess}
                    </h2>

                    {[...Array(LINE_COUNT)].map((_, i) => (
                        <Line key={i} index={i} line={board[i]} currentGuess={currentLineIndex} gameOver={gameOver} />
                    ))}
                </>
            )}

            {errorMessage && (
                <>
                    <Error errorMessage={errorMessage} errorFlag={errorFlag} />
                </>
            )}
        </>
    )
}

export default App
