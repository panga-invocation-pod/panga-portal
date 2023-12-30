import { Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

interface ILineWriterProps {
  lines: string[]
  delay?: number
  children: (line: string) => React.ReactNode
}

const defaultDelay = 1000

export default function LineWriter({
  lines,
  delay,
  children,
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
      {lines.slice(0, currentLineIndex + 1).map((line, index) => (
        <p key={index}>{children(line)}</p>
      ))}
    </div>
  )
}
