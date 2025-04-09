import React, { useEffect, useState } from 'react'

import { RESET_STRING, EMPTY_STATUS } from './Constants'

function Tile({ letter, index }) {
    const [pop, setPop] = useState(false)
    const [flipped, setFlipped] = useState(false)
    const { letter: char, borderStatus, guessStatus } = letter

    useEffect(() => {
        if (char !== RESET_STRING) {
            setPop(true)
            const timeout = setTimeout(() => setPop(false), 150)
            return () => clearTimeout(timeout)
        }
    }, [char])

    useEffect(() => {
        if (guessStatus !== EMPTY_STATUS && !flipped) {
            const timeout = setTimeout(() => {
                setFlipped(true)
            }, index * 500)

            return () => clearTimeout(timeout)
        }
    }, [guessStatus, index, flipped])

    return (
        <div className={`tile-container ${flipped ? 'flipped' : null}`}>
            <div className={`tile ${pop ? 'pop' : null}`}>
                <div className={`tile-front ${borderStatus ? 'active-border' : null}`}>
                    {char}
                </div>
                <div className={`tile-back ${guessStatus}`}>
                    {char}
                </div>
            </div>
        </div>
    )
}

export default Tile