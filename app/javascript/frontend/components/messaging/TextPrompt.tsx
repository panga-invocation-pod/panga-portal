import React from "react"
import { ITextPrompt } from "./types"
import PromptText from "./PromptText"

export default function TextPrompt({
  prompt,
  mode,
  finished,
  onFinished,
}: {
  prompt: ITextPrompt
  mode: null | "fast"
  finished: boolean
  onFinished: () => void
}) {
  return (
    <PromptText
      text={prompt.text}
      effect={(mode != "fast" && prompt.character?.effect) || null}
      finished={finished}
      onFinished={onFinished}
    />
  )
}
