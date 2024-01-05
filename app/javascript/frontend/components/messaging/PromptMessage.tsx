import React, { useEffect, useState } from "react"
import { IPromptMessage, Respond } from "./types"
import Responder from "./Responder"
import FadeIn from "react-fade-in"
import MessageItems from "./MessageItems"

interface PromptMessageProps {
  message: IPromptMessage
  respond: Respond
  mode: null | "fast"
}

type MessageStage = "start" | "prompt" | "respond"

export default function PromptMessage({
  message,
  respond,
  mode,
}: PromptMessageProps) {
  const [stage, setStage] = useState<MessageStage>("start")
  const [stateMessage, setMessage] = useState<IPromptMessage>(message)

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
        <MessageItems
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
