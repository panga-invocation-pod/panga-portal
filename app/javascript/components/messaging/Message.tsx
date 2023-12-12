import React from "react"
import { ICharacter, IMessage, Respond } from "./types"
import Responder from "./Responder"

interface MessageProps {
  message: IMessage
  respond: Respond
  character: ICharacter
}

export default function Message({ message, respond, character }: MessageProps) {
  return (
    <div className="message">
      <div className="message-item">
        <img
          src={`/assets/characters/${character.slug}/thumbnail.png`}
          className="character thumbnail"
          alt={character.name}
        />
        <div className="prompt">{message.prompt}</div>
      </div>

      {message.responder && (
        <Responder responder={message.responder} respond={respond} />
      )}
    </div>
  )
}
