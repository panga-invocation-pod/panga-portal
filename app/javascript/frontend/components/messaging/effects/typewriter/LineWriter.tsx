import { Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

interface ILineWriterProps {
  lines: string[]
  beforeLineDelay?: number
  betweenLineDelay?: number
  children: (line: string, onFinished?: () => void) => React.ReactNode
  onFinished?: () => void
}

export default function LineWriter({
  lines,
  beforeLineDelay,
  betweenLineDelay,
  children,
  onFinished,
}: ILineWriterProps) {
  const [lineIndex, setLineIndex] = useState(0)

  const incrementLine = () => {
    if (lineIndex < lines.length) {
      setLineIndex(lineIndex + 1)
    }
  }

  const delayedIncrementLine = (delay: number | undefined) => {
    if (delay) {
      setTimeout(incrementLine, delay)
    } else {
      incrementLine()
    }
  }

  useEffect(() => {
    delayedIncrementLine(beforeLineDelay)
  }, [lines])

  const onChildFinished = (childIndex: number) => {
    const isLastLine = childIndex >= lines.length - 1

    if (isLastLine) {
      if (onFinished) onFinished()
    } else {
      delayedIncrementLine(betweenLineDelay)
    }
  }

  return (
    <div>
      {lines.slice(0, lineIndex).map((line, index) => {
        return <p key={index}>{children(line, () => onChildFinished(index))}</p>
      })}
    </div>
  )
}
