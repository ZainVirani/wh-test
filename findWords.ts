/**
 * O(i)
 * 
 * @param word string length i
 * @returns an object with counts of letter occurrences of `word`
 */
function getLetterOccurrences(word: string): { [key: string]: number } {
  const letterOccurrences: { [key: string]: number } = {}

  // iterate through each character of the word and keep track of the number of times a character has been seen
  word.split('').forEach(letter => {
    if (letterOccurrences[letter]) {
      letterOccurrences[letter]++
    } else {
      letterOccurrences[letter] = 1
    }
  })

  return letterOccurrences
}

/**
 * O(m+kn)
 * 
 * @param inputString string length m
 * @param dictionary array of strings length n with average word length k
 * @returns a list of words from `dictionary` that are composed entirely of a subset of letters from `inputString`
 */
function findWords(inputString: string, dictionary: string[]): string[] {
  // this object will keep track of the letter occurrences in the input string
  const inputStringLetterOccurrences = getLetterOccurrences(inputString) // o(m)

  // for each word in the dictionary, we want to determine if the word is a subset of letters from `inputString`
  // we assume it is, then check:
  // 1. if the word contains a letter not in the input string, we reject the word
  // 2. if the word contains more instances of a single letter than there are instances in the `inputString`, we reject the word
  // the filtered array is our function result
  return dictionary.filter(word => { // o(n)
    if (!word) return false
    const wordLetterOccurrences = getLetterOccurrences(word) // o(k)
    let wordContainsAllowedLetters = true
    Object.keys(wordLetterOccurrences).forEach(letter => {
      if (!inputStringLetterOccurrences[letter] || inputStringLetterOccurrences[letter] < wordLetterOccurrences[letter]) wordContainsAllowedLetters = false
    })
    return wordContainsAllowedLetters
  })
}