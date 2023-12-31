import React, { useEffect, useState } from "react"

interface IWordWriterProps {
  text: string
  perLetterDelay?: number
  onFinished: () => void
}

const defaultPerLetterDelay = 50

export default function WordWriter({
  text,
  perLetterDelay,
  onFinished,
}: IWordWriterProps) {
  const words = text.split(" ")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const displayWords = words.slice(0, currentWordIndex + 1)

  useEffect(() => {
    const lastWord = displayWords[displayWords.length - 1]
    const delay = lastWord.length * (perLetterDelay || defaultPerLetterDelay)

    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1)
      } else {
        if (onFinished) onFinished()
      }
    }, delay)
  }, [text, currentWordIndex])

  return displayWords.join(" ")
}
