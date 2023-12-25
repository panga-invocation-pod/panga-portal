import React, { useEffect, useState } from "react"
import Message from "../components/messaging/Message"
import {
  IMessage,
  IPostReply,
  IInput,
  ICharacter,
} from "../components/messaging/types"
import ChatClient from "../api/chat_client"
import { useLocation, useParams } from "react-router-dom"
import "../stylesheets/chat.scss"
import { Center, Spinner } from "@chakra-ui/react"

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

  return (
    <div className="chat-container">
      <Message
        message={message}
        respond={respond}
        mode={hash == "#fast" ? "fast" : null}
      />
    </div>
  )
}
