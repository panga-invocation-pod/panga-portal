import React from "react"
import { ICharacter, IMessage, Respond } from "./types"
import Responder from "./Responder"
import CharacterThumbnail from "./CharacterThumbnail"

interface MessagePrompt {
  prompt: string
}

export default function MessagePrompt({ prompt }: MessagePrompt) {
  return <div className="prompt">{prompt}</div>
}
