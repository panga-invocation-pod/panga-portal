import { IChatStatus, IPostReply } from "../components/messaging/types"

export default class ChatClient {
  inviteToken: string

  constructor(inviteToken: string) {
    this.inviteToken = inviteToken
  }

  get(callback: (response: IChatStatus) => void, onError?: () => void) {
    fetch(this.endpoint(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data)
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
        if (onError) onError()
      })
  }

  post(
    postReply: IPostReply,
    callback: (response: IChatStatus) => void,
    onError?: () => void,
  ) {
    fetch(this.endpoint(), {
      method: "POST",
      body: JSON.stringify(postReply),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        callback(data)
      })
      .catch((error) => {
        console.log(error)
        if (onError) onError()
      })
  }

  endpoint(): string {
    return `/api/invitations/${this.inviteToken}/chat.json`
  }
}
