import React, { useEffect, useState } from 'react'

import { ERROR_FADE_DELAY, PULSE_ANIMATION } from './Constants'

//=========================================================================================================================================================================

function Error({ error }) {
    const [fadeOut, setFadeOut] = useState(false)
    const [pulse, setPulse] = useState(false)

    //=========================================================================================================================================================================

    //Handling the end of the pulse animation
    const handlePulseEnd = (e) => {
        if (e.animationName === PULSE_ANIMATION) {
            setPulse(false)
        }
    }

    //=========================================================================================================================================================================

    //Use effect to set the error fade out
    useEffect(() => {
        setFadeOut(false)
        setPulse(false)
        requestAnimationFrame(() => setPulse(true))

        const errorTimeout = setTimeout(() => {
            setFadeOut(true)
        }, ERROR_FADE_DELAY)

        return () => clearTimeout(errorTimeout)
    }, [error])

    //=========================================================================================================================================================================

    //HTML structure with properties of an error message
    return (
        <div className="error-container">
            <div className={`error-message ${error.toggle != null ? 'new-error' : null} ${fadeOut ? 'fade-out' : null} ${pulse ? 'pulse' : null}`} onAnimationEnd={handlePulseEnd}>
                {error.message}
            </div>
        </div>
    )
}

//=========================================================================================================================================================================

export default Error