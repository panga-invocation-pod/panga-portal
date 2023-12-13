import React, { useEffect, useState } from "react"
import Typewriter from "./helpers/typewriter/Typewriter"
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
    if (effectFinished) return

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
          text={prompt.split("\n\n")}
          onFinished={onEffectFinished}
          cursor={!effectFinished}
          speed={20}
          random={0}
          delay={500}
        />
      )}
      {effect === null && prompt}
    </div>
  )
}
