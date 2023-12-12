import React from "react"
import { ICharacter, IMessage, Respond } from "./types"
import Responder from "./Responder"
import CharacterThumbnail from "./CharacterThumbnail"
import MessagePrompt from "./MessagePrompt"

interface MessageProps {
  message: IMessage
  respond: Respond
  character: ICharacter
}

export default function Message({ message, respond, character }: MessageProps) {
  return (
    <div className="message">
      <div className="message-item">
        <CharacterThumbnail character={character} />
        <MessagePrompt prompt={message.prompt} effect={character.effect} />
      </div>

      {message.responder && (
        <Responder responder={message.responder} respond={respond} />
      )}
    </div>
  )
}
