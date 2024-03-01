import React from "react"
import { IPrompt } from "./types"
import CharacterThumbnail from "../characters/CharacterThumbnail"
import Prompt from "./Prompt"

interface MessageItemProps {
  prompt: IPrompt
  mode: null | "fast"
  finished: boolean
  onFinished: () => void
  avatarSide?: "left" | "right"
  displayAvatar?: boolean
}

export default function MessageItem({
  prompt,
  mode,
  finished,
  onFinished,
  avatarSide = "left",
  displayAvatar = true,
}: MessageItemProps) {
  return (
    <div className={`message-item avatar-${avatarSide}`}>
      {prompt.character && displayAvatar && (
        <CharacterThumbnail character={prompt.character} />
      )}
      <Prompt
        prompt={prompt}
        mode={mode}
        finished={finished}
        onFinished={onFinished}
      />
    </div>
  )
}
