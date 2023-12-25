import React, { useEffect, useState } from "react"
import Typewriter from "./typewriter/Typewriter"

interface RobotEffectProps {
  text: string
  onFinished: () => void
}

export default function RobotEffect({ text, onFinished }: RobotEffectProps) {
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
    <Typewriter
      text={text.split("\n\n")}
      onFinished={onEffectFinished}
      cursor={!effectFinished}
      speed={30}
      random={30}
      delay={400}
      startDelay={300}
    />
  )
}
