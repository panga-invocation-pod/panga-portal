import React from "react"
import PromptMessage from "./PromptMessage"
import { IMessage, IPromptMessage, IUrlMessage, Respond } from "./types"
import UrlMessage from "./UrlMessage"

interface MessageProps {
  message: IMessage
  respond: Respond
  mode: null | "fast"
}

export default function Message(props: MessageProps) {
  const { message } = props

  if (message.hasOwnProperty("url")) {
    return <UrlMessage message={message as IUrlMessage} />
  } else {
    return (
      <PromptMessage
        key={message.id}
        {...props}
        message={message as IPromptMessage}
      />
    )
  }
}
