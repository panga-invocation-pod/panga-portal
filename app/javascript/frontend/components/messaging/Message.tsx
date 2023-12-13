import React, { useEffect, useState } from "react"
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
  const [stateMessage, setMessage] = useState<IMessage>(message)

  useEffect(() => {
    setStage("start")
    setMessage(message)
    setTimeout(() => setStage("prompt"), 1)
  }, [message.id])

  if (stage == "start") {
    return <div className="message" />
  }

  return (
    <div className="message">
      <div className="message-item">
        <CharacterThumbnail character={character} />
        <MessagePrompt
          prompt={stateMessage.prompt}
          effect={character.effect}
          key={stateMessage.id}
          onFinished={() => setStage("respond")}
        />
      </div>

      {stateMessage.responder && stage == "respond" && (
        <FadeIn>
          <Responder responder={stateMessage.responder} respond={respond} />
        </FadeIn>
      )}
    </div>
  )
}
