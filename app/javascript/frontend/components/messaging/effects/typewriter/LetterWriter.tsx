import React, { useEffect, useState } from "react"

interface ILetterWriterProps {
  text: string
  beforeStartDelay?: number
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
  beforeStartDelay,
  perLetterDelay,
  onFinished,
}: ILetterWriterProps) {
  const [letterIndex, setLetterIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const incrementLetterIndex = () => {
    setLetterIndex(letterIndex + 1)
  }

  const nextLetter = () => {
    if (letterIndex < text.length) {
      incrementLetterIndex()
    } else {
      if (onFinished) onFinished()
    }
  }

  useEffect(() => {
    if (letterIndex == 0 && beforeStartDelay) {
      setPaused(true)

      setTimeout(() => {
        setPaused(false)
        nextLetter()
      }, beforeStartDelay)
    } else {
      let delay = perLetterDelay || defaultPerLetterDelay
      setTimeout(nextLetter, delay)
    }
  }, [text, letterIndex])

  const visibleText = text.slice(0, letterIndex)
  const remainingText = text.slice(letterIndex)
  const remainingWord = firstWordOf(remainingText)
  const currentlyTyping = remainingText.length > 0

  return (
    <span
      className={`letter-writer ${
        currentlyTyping ? "in-progress" : "finished"
      } ${paused ? "paused" : ""}`}
    >
      <span className="visible-letters">{visibleText}</span>
      <span className="invisible-letters">{remainingWord}</span>
    </span>
  )
}
