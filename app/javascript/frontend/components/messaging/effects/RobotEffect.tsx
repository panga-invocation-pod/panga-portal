import React, { useEffect, useState } from "react"
import { EffectProps } from "./effects_shared"
import LineWriter from "./typewriter/LineWriter"
import LetterWriter from "./typewriter/LetterWriter"

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
      <LineWriter lines={text.split("\n\n")} onFinished={onEffectFinished}>
        {(line: string, onFinished) => (
          <LetterWriter
            text={line}
            beforeStartDelay={1000}
            perLetterDelay={30}
            onFinished={onFinished}
          />
        )}
      </LineWriter>
    </div>
  )
}
