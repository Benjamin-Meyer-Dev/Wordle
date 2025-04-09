import React, { useEffect, useState } from 'react'
import Tile from './Tile'

import { TILE_COUNT } from './Constants'

function Line({ letters, shake, shakeKey }) {
    const [shaking, setShaking] = useState(false)

    useEffect(() => {
        if (shake) {
            setShaking(true)
            const timeout = setTimeout(() => setShaking(false), 500)
            return () => clearTimeout(timeout)
        }
    }, [shake, shakeKey])

    return (
        <div className={`line ${shaking ? 'shake' : null}`}>
            {[...Array(TILE_COUNT)].map((_, i) => (
                <Tile key={i} letter={letters[i]} index={i}/>
            ))}
        </div>
    )
}

export default Line