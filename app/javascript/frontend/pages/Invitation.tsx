import React, { useEffect, useState } from "react"
import Message from "../components/messaging/Message"
import {
  IPromptMessage,
  IPostReply,
  IInput,
  IChatStatus,
} from "../components/messaging/types"
import ChatClient from "../api/chat_client"
import { useLocation, useParams } from "react-router-dom"
import "../stylesheets/chat.scss"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Spinner,
} from "@chakra-ui/react"
import {
  IMessagingConfig,
  MessagingContext,
} from "../components/messaging/context"

const endpoint = (token: string) => `/hi/${token}/chat.json`

export default function Invitation() {
  let { token } = useParams()
  const { hash } = useLocation()

  if (!token) {
    return <div>Invalid token</div>
  }

  const [message, setMessage] = useState<IPromptMessage | "error" | null>(null)
  const client = new ChatClient(token)

  const onData = (data: IChatStatus) => {
    setMessage(data.message)
  }

  const onError = () => {
    setMessage("error")
  }

  useEffect(() => {
    client.get(onData, onError)
  }, [token])

  if (!message) {
    return (
      <div className="chat-container">
        <Center>
          <Spinner />
        </Center>
      </div>
    )
  }

  const respond = (messageId: string, input: IInput) => {
    const postReply: IPostReply = {
      reply: {
        to: messageId,
        input,
      },
    }

    client.post(postReply, onData, onError)
  }

  const providerConfig: IMessagingConfig = {
    responders: {},
  }

  if (message == "error") {
    return (
      <Alert status="error" flexDirection="column">
        <AlertIcon />
        <AlertTitle>There was an error</AlertTitle>
        <AlertDescription>
          Sorry, this shouldn't happen. Please reach out to us and let us know.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="chat-container">
      <MessagingContext.Provider value={providerConfig}>
        <Message
          message={message}
          respond={(input: IInput) => respond(message.id, input)}
          mode={hash == "#fast" ? "fast" : null}
        />
      </MessagingContext.Provider>
    </div>
  )
}
