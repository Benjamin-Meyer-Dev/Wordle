import React, { useState, useEffect } from 'react'
import Line from './Line'
import { LINE_COUNT, TILE_COUNT, LETTER_COUNT_ERROR, RESET_STRING, WORD_LIST_ERROR } from './Constants'

function UserInput({ setError, setErrorKey }) {
    const [currentTileIndex, setCurrentTileIndex] = useState(0)
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [typedLetters, setTypedLetters] = useState(
        [...Array(LINE_COUNT)].map(() => Array(TILE_COUNT).fill(RESET_STRING))
    )

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newTypedLetters = [...typedLetters]
            const currentLine = newTypedLetters[currentLineIndex]
            
            if (e.key === 'Enter') {
                if (currentTileIndex !== TILE_COUNT) {
                    setError(LETTER_COUNT_ERROR)
                    setErrorKey((prev) => prev + 1)
                } else {
                    const storedWords = localStorage.getItem('wordleWords')

                    if (!storedWords.includes(currentLine.join('').toLowerCase())) {
                        setError(WORD_LIST_ERROR)
                        setErrorKey((prev) => prev + 1)
                    } else {
                        if (currentLineIndex < LINE_COUNT - 1) {
                            setCurrentLineIndex(currentLineIndex + 1)
                            setCurrentTileIndex(0)
                            setError(RESET_STRING)
                        }
                    }
                }
            } else if (e.key === 'Backspace') {
                if (currentTileIndex > 0) {
                    currentLine[currentTileIndex - 1] = RESET_STRING
                    setCurrentTileIndex(currentTileIndex - 1)
                    setTypedLetters(newTypedLetters)
                }
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                if (currentTileIndex < TILE_COUNT) {
                    currentLine[currentTileIndex] = e.key.toUpperCase()
                    setCurrentTileIndex(currentTileIndex + 1)
                    setTypedLetters(newTypedLetters)
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [typedLetters, currentTileIndex, currentLineIndex, setError, setErrorKey])

    return (
        <div>
            {[...Array(LINE_COUNT)].map((_, i) => (
                <Line key={i} letters={typedLetters[i]} />
            ))}
        </div>
    )
}

export default UserInput