import React, { useState } from "react"
import { ICharacter, IPrompt } from "./types"
import MessageItem from "./MessageItem"

interface MessageItemsProps {
  prompt: IPrompt | Array<IPrompt>
  mode: null | "fast"
  onFinished: () => void
}

type AvatarSide = "left" | "right"

function changeSide(side: AvatarSide): AvatarSide {
  return side === "left" ? "right" : "left"
}

function differentCharacters(
  a: ICharacter | null | undefined,
  b: ICharacter | null | undefined,
): boolean {
  if (!a || !b) return false
  return a.id !== b.id
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

  const onItemFinished = (itemIndex: number) => {
    if (itemIndex < prompts.length - 1) {
      setTimeout(() => setIndex(index + 1), 500)
    } else {
      onFinished()
    }
  }

  let previousCharacter: ICharacter | null = null
  let previousSide: AvatarSide = "left"

  return (
    <div className="message-items">
      {prompts.slice(0, index + 1).map((prompt, index) => {
        const changedCharacters: boolean =
          previousCharacter != null &&
          differentCharacters(previousCharacter, prompt.character)
        previousCharacter = prompt.character
        const currentSide = changedCharacters
          ? changeSide(previousSide)
          : previousSide
        previousSide = currentSide

        return (
          <MessageItem
            prompt={prompt}
            mode={mode}
            key={index}
            onFinished={() => onItemFinished(index)}
            avatarSide={currentSide}
            displayAvatar={changedCharacters || index === 0}
          />
        )
      })}
    </div>
  )
}
