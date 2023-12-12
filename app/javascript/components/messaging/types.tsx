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
