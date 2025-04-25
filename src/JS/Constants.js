//=========================================================================================================================================================================

//Number of lines and tiles per line
export const LINE_COUNT = 6
export const TILE_COUNT = 5

//=========================================================================================================================================================================

//Special keys
export const BACKSPACE_KEY = "Backspace"
export const ENTER_KEY = "Enter"

//=========================================================================================================================================================================

//Virtual keyboard rows
export const FIRST_ROW = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
export const SECOND_ROW = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
export const THIRD_ROW = [ENTER_KEY, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', BACKSPACE_KEY]

//=========================================================================================================================================================================

//Keys
export const KEY = "key"
export const KEY_DOWN = "keydown"
export const KEY_CORRECT = "key correct"
export const KEY_PRESENT = "key present"
export const KEY_ABSENT = "key absent"

//=========================================================================================================================================================================

//Key statuses
export const CORRECT_STATUS = {status: "correct", priority: 3}
export const PRESENT_STATUS = {status: "present", priority: 2}
export const ABSENT_STATUS = {status: "absent", priority: 1}
export const EMPTY_STATUS = {status: "empty", priority: 0}

//=========================================================================================================================================================================

//Word bank
export const NEW_LINE = "\n"
export const WORD_BANK_PATH = "/Word Bank/WordBank.txt"
export const USED_WORDS_LIMIT = 15000
export const FIRST_SLICE = 1

//=========================================================================================================================================================================

//User guess
export const LETTER_MATCH = new RegExp('^[A-Z]$')
export const LETTER_COUNT_ERROR = "Not enough letters"
export const WORD_LIST_ERROR = "Not in word list"

//=========================================================================================================================================================================

//Animations
export const TILE_BOUNCE_ANIMATION = "tileBounceAnimation"
export const TILE_SHAKE_ANIMATION = "tileShakeAnimation"
export const ERROR_PULSE_ANIMATION = "errorPulseAnimation"

export const BOUNCE_DELAY = 150
export const ERROR_FADE_DELAY = 3000
export const FLIP_DELAY = 300
export const CLEAR_DELAY = 300

//=========================================================================================================================================================================

//Game result
export const GAME_WON = "Win"
export const GAME_LOST = "Lost"

//=========================================================================================================================================================================

//Miscellaneous
export const BLANK_STRING = ""

//=========================================================================================================================================================================