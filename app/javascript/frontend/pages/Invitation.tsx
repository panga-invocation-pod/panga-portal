import React, { useEffect, useState } from "react"
import Message from "../components/messaging/Message"
import {
  IMessage,
  IPostReply,
  IInput,
  ICharacter,
} from "../components/messaging/types"
import ChatClient from "../api/chat_client"
import { useParams } from "react-router-dom"
import "../stylesheets/chat.scss"

const endpoint = (token: string) => `/hi/${token}/chat.json`

export default function Invitation() {
  let { token } = useParams()
  const image = null

  if (!token) {
    return <div>Invalid token</div>
  }

  const [message, setMessage] = useState<IMessage | null>(null)
  const client = new ChatClient(token)

  const yamDaisy: ICharacter = {
    name: "Yam Daisy",
    slug: "yam_daisy",
    thumbnail: "broken",
    effect: "robot",
  }

  useEffect(() => {
    client.get((data) => {
      setMessage(data.message)
    })
  }, [])

  if (!message) {
    return <div>Loading...</div>
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
      <Message message={message} respond={respond} character={yamDaisy} />
    </div>
  )
}
