export interface ISelectOptionResponder {
  responder_type: "select_option"
  options: string[]
}

export interface ITextResponder {
  responder_type: "text"
}

export type IResponder = ISelectOptionResponder | ITextResponder

export interface IMessage {
  id: string
  prompt: string
  responder: IResponder | null
  character: ICharacter | null
}

export interface IChatStatus {
  message: IMessage
  data: any
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

export type Effect = "robot" | null

export interface ICharacter {
  id: string
  name: string
  thumbnail: string
  effect: Effect
}