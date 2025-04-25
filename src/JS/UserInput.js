import React, { useCallback, useEffect } from 'react'

import { ReactComponent as BackspaceIcon } from '../Images/Backspace.svg'
import { ReactComponent as EnterIcon } from '../Images/Enter.svg'

import { ABSENT_STATUS, BACKSPACE_KEY, CORRECT_STATUS, ENTER_KEY, FIRST_ROW, KEY, KEY_ABSENT, KEY_CORRECT, KEY_DOWN, KEY_PRESENT, LETTER_MATCH, PRESENT_STATUS, SECOND_ROW, THIRD_ROW } from './Constants'

//=========================================================================================================================================================================

// Handling of user input
function UserInput({ canInput, keyStatuses, onLetterPress, onBackspacePress, onEnterPress }) {

    //=========================================================================================================================================================================

    //Handling a user input
    const handleInput = useCallback((key) => {
        if (LETTER_MATCH.test(key.toUpperCase())) {
            onLetterPress(key.toUpperCase())
        } else if (key === BACKSPACE_KEY) {
            onBackspacePress()
        } else if (key === ENTER_KEY) {
            onEnterPress()
        }
    }, [onLetterPress, onBackspacePress, onEnterPress])

    //=========================================================================================================================================================================

    //Getting the status of a key on the virtual keyboard
    const getKeyStatus = (key) => {
        switch (keyStatuses[key]) {
            case CORRECT_STATUS:
                return KEY_CORRECT
            case PRESENT_STATUS:
                return KEY_PRESENT
            case ABSENT_STATUS:
                return KEY_ABSENT
            default:
                return KEY
        }
    }

    //=========================================================================================================================================================================

    //Use effect for user keyboard input
    useEffect(() => {
        if (!canInput) {
            return
        }

        const handleKeyDown = (e) => {
            handleInput(e.key)
        }

        window.addEventListener(KEY_DOWN, handleKeyDown)

        return () => {
            window.removeEventListener(KEY_DOWN, handleKeyDown)
        }
    }, [canInput, handleInput])

    //=========================================================================================================================================================================

    //HTML structure with properties of the virtual keyboard
    return (
        <>
            <div className="keyboard">
                <div className="keyboard-row">
                    {FIRST_ROW.map((key) => (
                        <button key={key} onClick={() => handleInput(key)} className={getKeyStatus(key)}>
                            {key}
                        </button>
                    ))}
                </div>
                <div className="keyboard-row">
                    {SECOND_ROW.map((key) => (
                        <button key={key} onClick={() => handleInput(key)} className={getKeyStatus(key)}>
                            {key}
                        </button>
                    ))}
                </div>
                <div className="keyboard-row">
                    {THIRD_ROW.map((key) => (
                        <button key={key} onClick={() => handleInput(key)} className={`key ${key === ENTER_KEY ? 'wide-key enter' : key === BACKSPACE_KEY ? 'wide-key backspace' : null} ${getKeyStatus(key)}`}>
                            {key === ENTER_KEY ? (<EnterIcon />) : key === BACKSPACE_KEY ? (<BackspaceIcon />) : (key)}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

//=========================================================================================================================================================================

export default UserInput