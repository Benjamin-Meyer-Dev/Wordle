import React, { useEffect, useState } from 'react'

import { ERROR_FADE_DELAY } from './Constants'

function Error({ errorMessage, errorFlag }) {
    const [pulse, setPulse] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        setFadeOut(false)
        setPulse(false)
        requestAnimationFrame(() => setPulse(true))

        const timeout = setTimeout(() => {
            setFadeOut(true)
        }, ERROR_FADE_DELAY)

        return () => clearTimeout(timeout)
    }, [errorFlag])

    const handlePulseEnd = (e) => {
        if (e.animationName === 'pulseAnimation') {
            setPulse(false)
        }
    }

    return (
        <div className="error-container">
            <div className={`error-message ${fadeOut ? 'fade-out' : 'null'} ${pulse ? 'pulse' : null}`} onAnimationEnd={handlePulseEnd}>
                {errorMessage}
            </div>
        </div>
    )
}

export default Error