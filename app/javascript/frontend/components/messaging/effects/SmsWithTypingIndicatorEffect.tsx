import React, { useState } from "react"
import TypingIndicator from "./TypingIndicator"
import { EffectProps } from "./effects_shared"

export default function SmsWithTypingIndicatorEffect({
  text,
  onFinished,
}: EffectProps) {
  const [stage, setStage] = useState("typing")

  const onTypingFinished = () => {
    setStage("display")
    onFinished()
  }

  if (stage === "typing") {
    return (
      <TypingIndicator
        onFinished={onTypingFinished}
        numFlashes={3}
        displayClass="sms-typing-indicator"
      />
    )
  } else if (stage === "display") {
    return <div className="sms-effect">{text}</div>
  } else {
    return null
  }
}
