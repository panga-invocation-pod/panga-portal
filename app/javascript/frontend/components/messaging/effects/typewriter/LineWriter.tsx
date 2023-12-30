import { Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

interface ILineWriterProps {
  lines: string[]
  delay?: number
  children: (line: string, onFinished?: () => void) => React.ReactNode
  onFinished?: () => void
}

const defaultDelay = 1000

export default function LineWriter({
  lines,
  delay,
  children,
  onFinished,
}: ILineWriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (currentLineIndex < lines.length - 1) {
        setCurrentLineIndex(currentLineIndex + 1)
      }
    }, delay || defaultDelay)
  }, [currentLineIndex, lines])

  return (
    <div>
      {lines.slice(0, currentLineIndex + 1).map((line, index) => {
        const isLastLine = index === lines.length - 1

        return (
          <p key={index}>
            {children(line, isLastLine ? onFinished : undefined)}
          </p>
        )
      })}
    </div>
  )
}
