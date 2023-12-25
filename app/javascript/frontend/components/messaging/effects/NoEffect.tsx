import React, { useEffect } from "react"
import { EffectProps } from "./effects_shared"

export default function NoEffect({ text, onFinished }: EffectProps) {
  useEffect(() => {
    onFinished()
  }, [text])

  return text
}
