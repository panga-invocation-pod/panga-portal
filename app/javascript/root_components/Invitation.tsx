import React, { useEffect, useState } from "react"
import DisplayMessage, { Message } from "../components/messaging/DisplayMessage"

export default function Invitation() {
  const [message, setMessage] = useState<Message | null>(null)

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
      <DisplayMessage {...message} />
    </div>
  )
}
