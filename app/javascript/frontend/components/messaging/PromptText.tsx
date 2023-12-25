import React, { useEffect, useState } from "react"
import { MaybeEffect } from "./types"
import RobotEffect from "./effects/RobotEffect"
import NoEffect from "./effects/NoEffect"
import SmsWithTypingIndicatorEffect from "./effects/SmsWithTypingIndicatorEffect"

const components: { [key: string]: React.ReactNode } = {
  robot: RobotEffect,
  sms_with_typing_indicator: SmsWithTypingIndicatorEffect,
}

interface PromptTextProps {
  text: string
  effect: MaybeEffect
  onFinished: () => void
}

export default function PromptText({
  text,
  effect,
  onFinished,
}: PromptTextProps) {
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
  }, [effect, text])

  const EffectComponent = (effect && components[effect]) || NoEffect

  return (
    <div className="prompt">
      <EffectComponent text={text} onFinished={onFinished} />
    </div>
  )
}
