import { createContext } from "react"

export interface IMessagingConfig {
  responders: { [key: string]: React.ReactNode }
}

export const defaultConfig = {
  responders: {},
}

export const MessagingContext = createContext<IMessagingConfig>(defaultConfig)
