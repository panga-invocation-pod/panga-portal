import React, { useEffect, useState } from "react"
import Message from "../components/messaging/Message"
import { IMessage } from "../components/messaging/types"

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

  return (
    <div className="chat-container">
      <Message message={message} />
    </div>
  )
}
