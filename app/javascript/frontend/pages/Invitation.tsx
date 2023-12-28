import React, { useEffect, useState } from "react"
import Message from "../components/messaging/Message"
import { IMessage, IPostReply, IInput } from "../components/messaging/types"
import ChatClient from "../api/chat_client"
import { useLocation, useParams } from "react-router-dom"
import "../stylesheets/chat.scss"
import { Center, Spinner } from "@chakra-ui/react"
import {
  IMessagingConfig,
  MessagingContext,
} from "../components/messaging/context"
import SelectSessionAvailability from "../components/panga_messaging/responders/SelectSessionAvailability"

const endpoint = (token: string) => `/hi/${token}/chat.json`

export default function Invitation() {
  let { token } = useParams()
  const { hash } = useLocation()

  const image = null

  if (!token) {
    return <div>Invalid token</div>
  }

  const [message, setMessage] = useState<IMessage | null>(null)
  const client = new ChatClient(token)

  useEffect(() => {
    client.get((data) => {
      setMessage(data.message)
    })
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

  const respond = (input: IInput) => {
    const postReply: IPostReply = {
      reply: {
        to: message.id,
        input,
      },
    }

    client.post(postReply, (data) => {
      setMessage(data.message)
    })
  }

  const providerConfig: IMessagingConfig = {
    responders: {
      select_session_availability: SelectSessionAvailability,
    },
  }

  return (
    <div className="chat-container">
      <MessagingContext.Provider value={providerConfig}>
        <Message
          message={message}
          respond={respond}
          mode={hash == "#fast" ? "fast" : null}
        />
      </MessagingContext.Provider>
    </div>
  )
}
