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
  const [effectFinished, setEffectFinished] = useState(false)

  const onEffectFinished = () => {
    setEffectFinished(true)
    onFinished()
  }

  useEffect(() => {
    if (effect === null) {
      onEffectFinished()
    } else {
      setEffectFinished(false)
    }
  }, [effect, prompt])

  return (
    <div className="prompt">
      {effect === "robot" && (
        <Typewriter
          text={prompt}
          key={prompt}
          onFinished={onEffectFinished}
          cursor={!effectFinished}
        />
      )}
      {effect === null && prompt}
    </div>
  )
}
