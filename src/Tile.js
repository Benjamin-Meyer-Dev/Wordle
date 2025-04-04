import React, { useEffect } from 'react'
import useTile from './hooks/useTile'

function Tile({ index, letter}) {
    const { letter: tileLetter, setLetter, status } = useTile()

    useEffect(() => {
        if (letter !== tileLetter) {
            setLetter(letter)
        }
    }, [letter, tileLetter, setLetter])

    return (
        <div className={`tile ${status}`}>
            {tileLetter}
        </div>
    )
}

export default Tile