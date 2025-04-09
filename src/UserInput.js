import React, { useState, useEffect } from 'react'
import { GuessCheck } from './hooks/guessCheck'

import Line from './Line'

import { LINE_COUNT, TILE_COUNT, LETTER_COUNT_ERROR, RESET_STRING, WORD_LIST_ERROR, EMPTY_STATUS, CORRECT_STATUS } from './Constants'

function UserInput({ guessWord, setError, setErrorKey }) {
    const [currentTileIndex, setCurrentTileIndex] = useState(0)
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [shakeLine, setLineShake] = useState(null)
    const [isGameOver, setIsGameOver] = useState(false)
    const [shakeKey, setShakeKey] = useState(0)
    const [typedLetters, setTypedLetters] = useState(
        [...Array(LINE_COUNT)].map(() => Array(TILE_COUNT).fill({ letter: RESET_STRING, borderStatus: false, guessStatus: EMPTY_STATUS}))
    )

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isGameOver) {
                return
            }

            let newTypedLetters = [...typedLetters]
            const currentLine = newTypedLetters[currentLineIndex]
            
            if (e.key === 'Enter') {
                if (currentTileIndex !== TILE_COUNT) {
                    setError(LETTER_COUNT_ERROR)
                    setErrorKey((prev) => prev + 1)
                    setLineShake(currentLineIndex)
                    setShakeKey((prev) => prev + 1)
                } else {
                    const typedWord = currentLine.map(t => t.letter).join('')
                    const storedWords = localStorage.getItem('wordleWords')
                    const wordList = storedWords ? JSON.parse(storedWords) : []

                    if (!wordList.includes(typedWord.toLowerCase())) {
                        setError(WORD_LIST_ERROR)
                        setErrorKey((prev) => prev + 1)
                        setLineShake(currentLineIndex)
                        setShakeKey((prev) => prev + 1)
                    } else {
                        const updateLine = GuessCheck(typedWord, guessWord)
                        const newTypedLetters = [...typedLetters]

                        newTypedLetters[currentLineIndex] = updateLine
                        setTypedLetters(newTypedLetters)

                        const isCorrect = updateLine.every(tile => tile.guessStatus === CORRECT_STATUS)

                        if (isCorrect) {
                            setIsGameOver(true)
                            setError(RESET_STRING)
                        } else if (currentLineIndex < LINE_COUNT - 1) {
                            setTimeout(() => {
                                setCurrentLineIndex(currentLineIndex + 1)
                                setCurrentTileIndex(0)
                                setError(RESET_STRING)
                            }, 300)
                        }
                    }
                }
            } else if (e.key === 'Backspace') {
                if (currentTileIndex > 0) {
                    currentLine[currentTileIndex - 1] = { letter: RESET_STRING, borderStatus: false, guessStatus: EMPTY_STATUS }
                    setCurrentTileIndex(currentTileIndex - 1)
                    setTypedLetters(newTypedLetters)
                }
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                if (currentTileIndex < TILE_COUNT) {
                    currentLine[currentTileIndex] = { letter: e.key.toUpperCase(), borderStatus: true, guessStatus: EMPTY_STATUS }
                    setCurrentTileIndex(currentTileIndex + 1)
                    setTypedLetters(newTypedLetters)
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [typedLetters, currentTileIndex, currentLineIndex, isGameOver, guessWord, setError, setErrorKey])

    return (
        <div>
            {[...Array(LINE_COUNT)].map((_, i) => (
                <Line key={i} letters={typedLetters[i]} shake={shakeLine === i} shakeKey={shakeKey} />
            ))}
        </div>
    )
}

export default UserInput