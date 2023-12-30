import React, { useEffect, useState } from "react"

interface ILetterWriterProps {
  text: string
  perLetterDelay?: number
  onFinished?: () => void
}

const defaultPerLetterDelay = 50

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

  return text.slice(0, currentLetterIndex + 1)
}
