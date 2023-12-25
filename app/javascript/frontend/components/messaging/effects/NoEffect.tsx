import React, { useEffect, useState } from "react"
import Typewriter from "./typewriter/Typewriter"

interface NoEffectProps {
  text: string
  onFinished: () => void
}

export default function NoEffect({ text, onFinished }: NoEffectProps) {
  useEffect(() => {
    onFinished()
  }, [text])

  return text
}
