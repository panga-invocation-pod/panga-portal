import React, { useState } from "react"
import TypingIndicator from "./TypingIndicator"

interface TypingIndicatorEffectProps {
  text: string
  onFinished: () => void
}

export default function TypingIndicatorEffect({
  text,
  onFinished,
}: TypingIndicatorEffectProps) {
  const [stage, setStage] = useState("typing")

  const onTypingFinished = () => {
    setStage("display")
    onFinished()
  }

  if (stage === "typing") {
    return <TypingIndicator onFinished={onTypingFinished} numFlashes={3} />
  } else if (stage === "display") {
    return <div className="after-typing-indicator">{text}</div>
  } else {
    return null
  }
}
