import React, { useEffect, useState } from "react"
import Typewriter from "./typewriter/Typewriter"
import { EffectProps } from "./effects_shared"

export default function RobotEffect({ text, onFinished }: EffectProps) {
  const [effectFinished, setEffectFinished] = useState(false)

  const onEffectFinished = () => {
    if (effectFinished) return

    setEffectFinished(true)
    onFinished()
  }

  useEffect(() => {
    setEffectFinished(false)
  }, [text])

  return (
    <div className="robot-effect">
      <Typewriter
        text={text.split("\n\n")}
        onFinished={onEffectFinished}
        cursor={!effectFinished}
        speed={30}
        random={30}
        delay={400}
        startDelay={300}
      />
    </div>
  )
}
