import { CORRECT_STATUS, PRESENT_STATUS, ABSENT_STATUS } from '../Constants'

export function GuessCheck(typedWord, guessWord) {
    const guessArray = guessWord.toUpperCase().split('')

    const result = typedWord.toUpperCase().split('').map((letter, i) => {
        if (letter === guessArray[i]) {
            return { letter, borderStatus: false, guessStatus: CORRECT_STATUS }
        } else if (guessArray.includes(letter)) {
            return { letter, borderStatus: false, guessStatus: PRESENT_STATUS }
        } else {
            return { letter, borderStatus: false, guessStatus: ABSENT_STATUS }
        }
    })

    return result
}