import React, { useState, useEffect, useCallback } from 'react'
import UserInput from './UserInput'
import Error from './Errors'
import FetchWords from './hooks/fetchWords'

import { ERROR_TIMER, RESET_STRING } from './Constants'
import './CSS/Styles.css'

function App() {
    const [error, setError] = useState(RESET_STRING)
    const [fadeOut, setFadeOut] = useState(false)
    const [errorKey, setErrorKey] = useState(0)
    const [guessWord, setGuessWord] = useState(RESET_STRING)

    const memoizedSetError = useCallback((newError) => {
        setError(newError)
    }, [])

    const memoizedSetErrorKey = useCallback((newKey) => {
        setErrorKey(newKey)
    }, [])

    useEffect(() => {
        const storedWords = localStorage.getItem('wordleWords')

        if (storedWords) {
            const wordArray = JSON.parse(storedWords)
            const randomIndex = Math.floor(Math.random() * wordArray.length)
            setGuessWord(wordArray[randomIndex].toUpperCase())
        }
    }, [])

    useEffect(() => {
        setFadeOut(false)

        const timer = setTimeout(() => {
            setFadeOut(true)
        }, ERROR_TIMER)

        return () => clearTimeout(timer)
    }, [errorKey])

    return (
        <>
            <FetchWords />
            <h1 className='title'>Wordle</h1>

            {guessWord && (
                <h2 className='guess-word'>
                    Random Word: {guessWord}
                </h2>
            )}

            <UserInput
                setError={memoizedSetError}
                setErrorKey={memoizedSetErrorKey}
            />

            {error && <Error message={error} fadeOut={fadeOut} />}
        </>
    )
}

export default App