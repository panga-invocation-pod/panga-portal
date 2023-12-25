import React from "react"
import { IPrompt } from "./types"
import MessageItem from "./MessageItem"

interface MessageItemsProps {
  prompt: IPrompt | Array<IPrompt>
  mode: null | "fast"
  onFinished: () => void
}

export default function MessageItems({
  prompt,
  mode,
  onFinished,
}: MessageItemsProps) {
  const prompts = Array.isArray(prompt) ? prompt : [prompt]

  if (prompts.length === 0) return null

  const initialCharacter = prompts[0].character

  return (
    <div className="message-items">
      {prompts.map((prompt, index) => (
        <MessageItem
          prompt={prompt}
          mode={mode}
          key={index}
          onFinished={onFinished}
          avatarSide={prompt.character === initialCharacter ? "left" : "right"}
        />
      ))}
    </div>
  )
}
