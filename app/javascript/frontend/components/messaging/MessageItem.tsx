import React from "react"
import { IPrompt, ITextPrompt } from "./types"
import CharacterThumbnail from "../characters/CharacterThumbnail"
import PromptText from "./PromptText"

interface MessageItemProps {
  prompt: IPrompt
  mode: null | "fast"
  onFinished: () => void
  avatarSide?: "left" | "right"
  displayAvatar?: boolean
}

function TextPrompt({
  prompt,
  mode,
  onFinished,
}: {
  prompt: ITextPrompt
  mode: null | "fast"
  onFinished: () => void
}) {
  return (
    <PromptText
      text={prompt.text}
      effect={(mode != "fast" && prompt.character?.effect) || null}
      onFinished={onFinished}
    />
  )
}

function Prompt({
  prompt,
  mode,
  onFinished,
}: {
  prompt: IPrompt
  mode: null | "fast"
  onFinished: () => void
}) {
  if (prompt.prompt_type === "text") {
    return <TextPrompt prompt={prompt} mode={mode} onFinished={onFinished} />
  } else if (prompt.prompt_type === "custom") {
    return "custom prompt"
  }
}

export default function MessageItem({
  prompt,
  mode,
  onFinished,
  avatarSide = "left",
  displayAvatar = true,
}: MessageItemProps) {
  return (
    <div className={`message-item avatar-${avatarSide}`}>
      {prompt.character && displayAvatar && (
        <CharacterThumbnail character={prompt.character} />
      )}
      <Prompt prompt={prompt} mode={mode} onFinished={onFinished} />
    </div>
  )
}
