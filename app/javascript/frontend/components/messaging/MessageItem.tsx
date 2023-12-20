import React from "react"
import { IPrompt } from "./types"
import CharacterThumbnail from "../characters/CharacterThumbnail"
import PromptText from "./PromptText"

interface MessageItemProps {
  prompt: IPrompt
  mode: null | "fast"
  onFinished: () => void
}

export default function MessageItem({
  prompt,
  mode,
  onFinished,
}: MessageItemProps) {
  return (
    <div className="message-item">
      {prompt.character && <CharacterThumbnail character={prompt.character} />}
      <PromptText
        text={prompt.text}
        effect={(mode != "fast" && prompt.character?.effect) || null}
        onFinished={onFinished}
      />
    </div>
  )
}
