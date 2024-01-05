export interface IOption {
  text: string
  type?: "primary" | "secondary"
  value?: string
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

export interface IFormResponderFieldBase {
  name: string
  label?: string
  field_type: "text" | "checkbox_group" | "email"
  placeholder?: string
  required?: boolean
}

export type IFormResponderTextField = IFormResponderFieldBase & {}

export type IFormResponderEmailField = IFormResponderFieldBase & {}

export interface ICheckboxGroupOption {
  value: string
  label: string
}

export type IFormResponderCheckboxGroupField = IFormResponderFieldBase & {
  options: ICheckboxGroupOption[]
}

export type IFormResponderField =
  | IFormResponderTextField
  | IFormResponderCheckboxGroupField

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

export interface IPromptMessage {
  id: string
  prompt: IPrompt | Array<IPrompt>
  responder: IResponder | null
}

export interface IUrlMessage {
  id: string
  url: string
}

export type IMessage = IPromptMessage | IUrlMessage

export interface IChatStatus {
  message: IPromptMessage
  data: any
}

export type IInput = {
  text: string
  submit?: boolean
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
