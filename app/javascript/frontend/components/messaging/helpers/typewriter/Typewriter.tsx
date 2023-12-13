// Based on https://github.com/gerardmarquinarubio/ReactTypewriter
// Licensed under the BSD Licence

import React, { useState, useEffect } from "react"
import "./typewriter.css"

const DEFAULT_MS = 30

export interface ITypewriterProps {
  text: string | string[]
  speed?: number
  random?: number
  delay?: number
  cursor?: boolean
  onFinished?: Function
  onStart?: Function
}

export default function Typewriter({
  text,
  speed = DEFAULT_MS,
  random = DEFAULT_MS,
  delay = DEFAULT_MS,
  cursor = true,
  onFinished = () => {},
  onStart = () => {},
}: ITypewriterProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  if (!Array.isArray(text)) text = [text]

  useEffect(() => {
    setTimeout(
      () => {
        if (currentTextIndex === 0) onStart()
        if (currentTextIndex < text[currentStringIndex].length) {
          setCurrentTextIndex(currentTextIndex + 1)
        } else {
          if (currentStringIndex < text.length - 1) {
            setTimeout(() => {
              setCurrentTextIndex(0)
              setCurrentStringIndex(currentStringIndex + 1)
            }, delay)
          } else {
            onFinished()
          }
        }
      },
      speed + Math.random() * random,
    )
  })

  let output = text.slice(0, currentStringIndex).join("\n\n")
  if (currentStringIndex > 0) output += "\n\n"
  output += text[currentStringIndex].substring(0, currentTextIndex)

  return (
    <span className="typewriter">
      {output}
      <span className="cursor">{cursor && "▎"}</span>
    </span>
  )
}
