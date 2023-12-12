import React, { useEffect, useState } from "react"
import Message from "../components/messaging/Message"
import { IMessage, IPostReply, IInput } from "../components/messaging/types"

export default function Invitation() {
  const [message, setMessage] = useState<IMessage | null>(null)

  useEffect(() => {
    fetch("/api/chat.json", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
        console.log(data)
      })
      .catch((error) => console.log(error))
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

    fetch("/api/chat.json", {
      method: "POST",
      body: JSON.stringify(postReply),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMessage(data.message)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="chat-container">
      <Message message={message} respond={respond} />
    </div>
  )
}
