export interface ISelectOptionResponder {
  responder_type: "select_option"
  options: string[]
}

export type IResponder = ISelectOptionResponder

export interface IMessage {
  id: string
  prompt: string
  responder: IResponder
}

export type IInput = {
  text: string
}

export type Respond = (input: IInput) => void

export interface IReply {
  to: string
  input: IInput
}

export interface IPostReply {
  reply: IReply
}
