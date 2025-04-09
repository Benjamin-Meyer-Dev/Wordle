import React, { useState, useEffect } from 'react'

import FetchWords from './FetchWords'
import Line from './Line.js'
import UserInput from './UserInput.js'

import { BLANK_STRING, EMPTY_STATUS, LINE_COUNT, TILE_COUNT } from './Constants'

import './CSS/Styles.css'
import { GuessCheck } from './GuessCheck.js'

function App() {
    const [board, setBoard] = useState(
        Array.from({ length: LINE_COUNT }, () => Array(TILE_COUNT).fill({letter: BLANK_STRING, borderStatus: false, flippedStatus: false, guessStatus: EMPTY_STATUS}))
    )

    const [wordToGuess, setWordToGuess] = useState(BLANK_STRING)
    const [currentTileIndex, setCurrentTileIndex] = useState(0)
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [storedWords, setStoredWords] = useState([])

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
                    flippedStatus: false,
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
                        flippedStatus: false,
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
        if (currentTileIndex !== TILE_COUNT) {

        } else {
            const userGuess = board[currentLineIndex].map(tile => tile.letter).join(BLANK_STRING)

            if (!storedWords.includes(userGuess.toLowerCase())) {

            } else {
                const guessResults = GuessCheck(userGuess, wordToGuess)

                setBoard(prevBoard => {
                    const newBoard = [...prevBoard]

                    newBoard[currentLineIndex] = guessResults

                    return newBoard
                })

                setCurrentLineIndex(prevIndex => prevIndex + 1)
                setCurrentTileIndex(0)
            }
        }
    }

    return (
        <>
            <FetchWords />
            <UserInput onLetterPress={handleLetterPress} onBackspacePress={handleBackspacePress} onEnterPress={handleEnterPress} />

            <h1 className='title'>Wordle</h1>

            {wordToGuess && (
                <>
                    <h2 className='word-to-guess'>
                        Random Word: {wordToGuess}
                    </h2>

                    {[...Array(LINE_COUNT)].map((_, i) => (
                        <Line key={i} line={board[i]} />
                    ))}
                </>
            )}
        </>
    )
}

export default App
