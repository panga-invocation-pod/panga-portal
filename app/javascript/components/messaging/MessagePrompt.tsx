import React, { useEffect, useState } from "react"
import Typewriter from "@mikhail2404/react-ts-typewriter"
import { Effect } from "./types"

interface MessagePrompt {
  prompt: string
  effect: Effect
  onFinished: () => void
}

export default function MessagePrompt({
  prompt,
  effect,
  onFinished,
}: MessagePrompt) {
  useEffect(() => {
    if (effect === null) {
      onFinished()
    }
  })

  return (
    <div className="prompt">
      {effect === "robot" && (
        <Typewriter text={prompt} key={prompt} onFinished={onFinished} />
      )}
      {effect === null && prompt}
    </div>
  )
}
