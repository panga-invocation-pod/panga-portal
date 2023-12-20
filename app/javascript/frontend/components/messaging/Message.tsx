import React, { useEffect, useState } from "react"
import { IMessage, Respond } from "./types"
import Responder from "./Responder"
import CharacterThumbnail from "../characters/CharacterThumbnail"
import PromptText from "./PromptText"
import FadeIn from "react-fade-in"
import MessageItem from "./MessageItem"

interface MessageProps {
  message: IMessage
  respond: Respond
  mode: null | "fast"
}

type MessageStage = "start" | "prompt" | "respond"

export default function Message({ message, respond, mode }: MessageProps) {
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
      {stateMessage && (
        <MessageItem
          prompt={stateMessage.prompt}
          mode={mode}
          key={stateMessage.id}
          onFinished={() => setStage("respond")}
        />
      )}

      {stateMessage.responder && stage == "respond" && (
        <FadeIn>
          <Responder responder={stateMessage.responder} respond={respond} />
        </FadeIn>
      )}
    </div>
  )
}
