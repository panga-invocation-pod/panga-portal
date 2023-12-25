import React, { useEffect, useState } from "react"
import { MaybeEffect } from "./types"
import RobotEffect from "./effects/RobotEffect"
import TypingIndicatorEffect from "./effects/TypingIndicatorEffect"
import NoEffect from "./effects/NoEffect"

const components: { [key: string]: React.ReactNode } = {
  robot: RobotEffect,
  typing_indicator: TypingIndicatorEffect,
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
