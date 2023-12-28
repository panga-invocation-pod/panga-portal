import { createContext } from "react"

interface IMessagingConfig {
  responders: { [key: string]: React.FC }
}

export const defaultConfig = {
  responders: {},
}

export const MessagingContext = createContext<IMessagingConfig>(defaultConfig)
