import { createContext } from "react"

export interface IMessagingConfig {
  responders: { [key: string]: React.ReactNode }
  prompts: { [key: string]: React.ReactNode }
}

export const defaultConfig = {
  responders: {},
  prompts: {},
}

export const MessagingContext = createContext<IMessagingConfig>(defaultConfig)
