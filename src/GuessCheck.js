import { CORRECT_STATUS, PRESENT_STATUS, ABSENT_STATUS } from './Constants'

export function GuessCheck(userGuess, wordToGuess) {
    const wordToGuessArray = wordToGuess.toUpperCase().split('')
    const guessArray = userGuess.toUpperCase().split('')

    const result = guessArray.map((letter, i) => {
        let guessStatus

        if (letter === wordToGuessArray[i]) {
            guessStatus = CORRECT_STATUS
        } else if (wordToGuessArray.includes(letter)) {
            guessStatus = PRESENT_STATUS
        } else {
            guessStatus = ABSENT_STATUS
        }

        return { letter, guessStatus }
    })

    return result.map(entry => ({
        ...entry,
        borderStatus: true,
        flippedStatus: true
    }))
}