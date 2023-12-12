import React from "react"
import Typewriter from "@mikhail2404/react-ts-typewriter"

interface MessagePrompt {
  prompt: string
  effect: Effect
}

export default function MessagePrompt({ prompt, effect }: MessagePrompt) {
  return (
    <div className="prompt">
      {effect === "robot" && <Typewriter text={prompt} key={prompt} />}
      {effect === null && prompt}
    </div>
  )
}
