import { ABSENT_STATUS, BLANK_STRING, CORRECT_STATUS, PRESENT_STATUS } from './Constants'

//=========================================================================================================================================================================

//Checking a user guess and updating the status of the individual tiles
export function GuessCheck(userGuess, wordToGuess) {
    const guessArray = userGuess.split(BLANK_STRING)
    const wordToGuessArray = wordToGuess.split(BLANK_STRING)
    const result = Array(guessArray.length).fill(null)
    const letterUsage = {}

    const unmatchedLetters = wordToGuessArray.map((char, i) => {
        const guessChar = guessArray[i]
    
        if (guessChar === char) {
            result[i] = { letter: guessChar, frontLetter: guessChar, backLetter: guessChar, guessStatus: CORRECT_STATUS }
            letterUsage[char] = (letterUsage[char] || 0) + 1

            return null
        }
    
        return char
    })
    
    guessArray.forEach((letter, i) => {
        if (result[i]) {
            return
        }
    
        const remainingCount = unmatchedLetters.filter(unmatchedLetter => unmatchedLetter === letter).length
        const usedCount = letterUsage[letter] || 0
        const status = remainingCount > usedCount ? PRESENT_STATUS : ABSENT_STATUS
    
        result[i] = { letter, frontLetter: letter, backLetter: letter, guessStatus: status }
    
        if (status === PRESENT_STATUS) {
            letterUsage[letter] = usedCount + 1
        }
    })
    
    return result.map(entry => ({
        ...entry,
        borderStatus: true
    }))    
}

//=========================================================================================================================================================================