import React from "react"
import { IPrompt } from "./types"
import TextPrompt from "./TextPrompt"
import { MessagingContext } from "./context"

export default function Prompt({
  prompt,
  mode,
  finished,
  onFinished,
}: {
  prompt: IPrompt
  mode: null | "fast"
  finished: boolean
  onFinished: () => void
}) {
  const config = React.useContext(MessagingContext)

  if (prompt.prompt_type === "text") {
    return (
      <TextPrompt
        prompt={prompt}
        mode={mode}
        finished={finished}
        onFinished={onFinished}
      />
    )
  } else if (prompt.prompt_type === "custom") {
    const PromptComponent = config.prompts[prompt.name]

    if (!PromptComponent) {
      return <div>Unknown custom prompt type: {prompt.name}</div>
    }

    return (
      <PromptComponent prompt={prompt} mode={mode} onFinished={onFinished} />
    )
  }
}
