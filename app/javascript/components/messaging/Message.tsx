import React, { useState } from "react"
import { ICharacter, IMessage, Respond } from "./types"
import Responder from "./Responder"
import CharacterThumbnail from "./CharacterThumbnail"
import MessagePrompt from "./MessagePrompt"
import FadeIn from "react-fade-in"

interface MessageProps {
  message: IMessage
  respond: Respond
  character: ICharacter
}

type MessageStage = "start" | "prompt" | "respond"

export default function Message({ message, respond, character }: MessageProps) {
  const [stage, setStage] = useState<MessageStage>("start")

  return (
    <div className="message">
      <div className="message-item">
        <CharacterThumbnail character={character} />
        <MessagePrompt
          prompt={message.prompt}
          effect={character.effect}
          onFinished={() => setStage("respond")}
        />
      </div>

      {message.responder && stage == "respond" && (
        <FadeIn>
          <Responder responder={message.responder} respond={respond} />
        </FadeIn>
      )}
    </div>
  )
}
