export interface IResponder {
  responder_type: string
  options: string[]
}

export interface IMessage {
  id: string
  prompt: string
  responder: IResponder
}
