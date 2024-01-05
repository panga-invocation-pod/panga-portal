import React, { useEffect } from "react"

import { IMessage, IPromptMessage, IUrlMessage, Respond } from "./types"

interface UrlMessageProps {
  message: IUrlMessage
}

export default function UrlMessage({ message }: UrlMessageProps) {
  useEffect(() => {
    window.location.href = message.url
  }, [message.id])

  return <div>redirecting you...</div>
}
