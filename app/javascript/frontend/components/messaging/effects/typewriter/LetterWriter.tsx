import React, { useEffect, useState } from "react"

interface ILetterWriterProps {
  text: string
  perLetterDelay?: number
  onFinished?: () => void
}

const defaultPerLetterDelay = 50

const firstWordOf = (text: string) => {
  const words = text.split(" ")
  if (words.length === 0) return ""
  return words[0]
}

export default function LetterWriter({
  text,
  perLetterDelay,
  onFinished,
}: ILetterWriterProps) {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)

  useEffect(() => {
    const delay = perLetterDelay || defaultPerLetterDelay

    setTimeout(() => {
      if (currentLetterIndex < text.length - 1) {
        setCurrentLetterIndex(currentLetterIndex + 1)
      } else {
        if (onFinished) onFinished()
      }
    }, delay)
  }, [text, currentLetterIndex])

  const visibleText = text.slice(0, currentLetterIndex + 1)
  const remainingText = text.slice(currentLetterIndex + 1)
  const remainingWord = firstWordOf(remainingText)

  return (
    <span className="letter-writer">
      <span className="visible-letters">{visibleText}</span>
      <span className="invisible-letters">{remainingWord}</span>
    </span>
  )
}
