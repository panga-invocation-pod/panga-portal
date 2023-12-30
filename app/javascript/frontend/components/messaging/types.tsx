export interface IOption {
  text: string
  type?: "primary" | "secondary"
}

export interface ISelectOptionResponder {
  responder_type: "select_option"
  options: IOption[]
}

export interface ITextResponder {
  responder_type: "text"
}

export interface IFormResponderButton {
  name: string
  text?: string
  button_type: "submit" | "cancel"
}

export interface IFormResponderField {
  name: string
  field_type: "text"
  placeholder?: string
  required?: boolean
}

export interface IFormResponder {
  responder_type: "form"
  buttons: IFormResponderButton[]
  fields: IFormResponderField[]
}

export interface ICustomResponder {
  responder_type: "custom"
  name: string
  custom_data: any
}

export type IResponder =
  | ISelectOptionResponder
  | ITextResponder
  | IFormResponder
  | ICustomResponder

export interface IPrompt {
  text: string
  character: ICharacter | null
}

export interface IMessage {
  id: string
  prompt: IPrompt | Array<IPrompt>
  responder: IResponder | null
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

export type Effect = "robot" | "sms_with_typing_indicator"

export type MaybeEffect = Effect | null

export interface ICharacter {
  id: string
  name: string
  thumbnail: string
  effect: MaybeEffect
}
