export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const nameToTitle = (name: string) =>
  capitalizeFirstLetter(name.replace(/_/g, " "))

export const arrayToSentence = (
  array: string[],
  lastSeparator: string = "and",
): string => {
  return array.reduce((sentence, word, index) => {
    if (index === 0) {
      return word
    } else if (index === array.length - 1) {
      return `${sentence} ${lastSeparator} ${word}`
    } else {
      return `${sentence}, ${word}`
    }
  })
}
