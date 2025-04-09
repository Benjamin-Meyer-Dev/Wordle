import { useEffect } from 'react'

import { LETTER_MATCH } from './Constants'

function UserInput({ onLetterPress, onBackspacePress, onEnterPress }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toUpperCase()

            if (LETTER_MATCH.test(key)) {
                onLetterPress(key)
            } else if (e.key === 'Backspace') {
                onBackspacePress()
            } else if (e.key === 'Enter') {
                onEnterPress()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onLetterPress, onBackspacePress, onEnterPress])

    return null
}

export default UserInput