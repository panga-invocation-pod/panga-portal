import { IChatStatus, IPostReply } from "../components/messaging/types"

export default class ChatClient {
  inviteToken: string

  constructor(inviteToken: string) {
    this.inviteToken = inviteToken
  }

  get(callback: (response: IChatStatus) => void) {
    fetch(this.endpoint(), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data)
        console.log(data)
      })
      .catch((error) => console.log(error))
  }

  post(postReply: IPostReply, callback: (response: IChatStatus) => void) {
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
      .catch((error) => console.log(error))
  }

  endpoint(): string {
    return `/hi/${this.inviteToken}/chat.json`
  }
}
