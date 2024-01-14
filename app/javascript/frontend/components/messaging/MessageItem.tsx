import React from "react"
import { IPrompt, ITextPrompt } from "./types"
import CharacterThumbnail from "../characters/CharacterThumbnail"
import PromptText from "./PromptText"
import { MessagingContext } from "./context"

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
  const config = React.useContext(MessagingContext)

  if (prompt.prompt_type === "text") {
    return <TextPrompt prompt={prompt} mode={mode} onFinished={onFinished} />
  } else if (prompt.prompt_type === "custom") {
    const PromptComponent = config.prompts[prompt.name]

    if (!PromptComponent) {
      return <div>Unknown custom prompt type: {prompt.name}</div>
    }

    return (
      <PromptComponent prompt={prompt} mode={mode} onFinished={onFinished} />
    )
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
