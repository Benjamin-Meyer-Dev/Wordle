import React, { useState, useEffect, useCallback } from 'react'
import UserInput from './UserInput'
import Error from './Errors'

import { ERROR_TIMER } from './Constants'
import './CSS/Styles.css'

function App() {
    const [error, setError] = useState("")
    const [fadeOut, setFadeOut] = useState(false)
    const [errorKey, setErrorKey] = useState(0)

    const memoizedSetError = useCallback((newError) => {
        setError(newError)
    }, [])

    const memoizedSetErrorKey = useCallback((newKey) => {
        setErrorKey(newKey)
    }, [])

    useEffect(() => {
        setFadeOut(false)

        const timer = setTimeout(() => {
            setFadeOut(true)
        }, ERROR_TIMER)

        return () => clearTimeout(timer)
    }, [errorKey])

    return (
        <div>
            <h1 className='title'>Wordle</h1>
            <UserInput setError={memoizedSetError} setErrorKey={memoizedSetErrorKey} />
            {error && <Error message={error} fadeOut={fadeOut} />}
        </div>
    )
}

export default App