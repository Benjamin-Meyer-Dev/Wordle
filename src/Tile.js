import React, { useEffect, useState } from 'react'

import { BLANK_STRING, EMPTY_STATUS, FLIP_DELAY } from './Constants'

function Tile({ index, tile }) {
    const [pop, setPop] = useState(false)
    const [flipped, setFlipped] = useState(false)

    useEffect(() => {
        if (tile.letter !== BLANK_STRING) {
            setPop(true)
        } else {
            setPop(false)
        }
    }, [tile.letter])

    useEffect(() => {
        if (tile.guessStatus !== EMPTY_STATUS && !flipped) {
            const timeout = setTimeout(() => {
                setFlipped(true)
            }, index * FLIP_DELAY)

            return () => clearTimeout(timeout)
        }
    }, [flipped, index, tile.guessStatus])

    return (
        <div className={`tile-container ${flipped ? 'flipped' : null}`}>
            <div className={`tile ${pop ? 'pop' : null}`}>
                <div className={`tile-front ${tile.borderStatus ? 'active-border' : null}`}>
                    {tile.letter}
                </div>
                <div className={`tile-back ${tile.guessStatus}`}>
                    {tile.letter}
                </div>
            </div>
        </div>
    )
}

export default Tile