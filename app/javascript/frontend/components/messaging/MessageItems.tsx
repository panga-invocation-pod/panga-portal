import React, { useState } from "react"
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

  const [index, setIndex] = useState(0)

  const initialCharacter = prompts[0].character

  const onItemFinished = () => {
    if (index < prompts.length - 1) {
      setTimeout(() => setIndex(index + 1), 500)
    } else {
      onFinished()
    }
  }

  return (
    <div className="message-items">
      {prompts.slice(0, index + 1).map((prompt, index) => (
        <MessageItem
          prompt={prompt}
          mode={mode}
          key={index}
          onFinished={onItemFinished}
          avatarSide={prompt.character === initialCharacter ? "left" : "right"}
        />
      ))}
    </div>
  )
}
