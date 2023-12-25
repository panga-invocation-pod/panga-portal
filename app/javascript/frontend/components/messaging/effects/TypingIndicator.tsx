import React from "react"

interface TypingIndicatorProps {
  onFinished: () => void
  numFlashes: number
}

export default function TypingIndicator({
  onFinished,
  numFlashes,
}: TypingIndicatorProps) {
  const [visible, setVisible] = React.useState(false)
  const [flashes, setFlashes] = React.useState(1)

  const duration = 600

  const toggleVisible = () => {
    setVisible(!visible)
    if (!visible) {
      if (flashes >= numFlashes + 1) {
        onFinished()
      } else {
        setFlashes(flashes + 1)
      }
    }
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      toggleVisible()
    }, duration)

    return () => {
      clearTimeout(timeout)
    }
  }, [visible])

  return (
    <div className={`typing-indicator ${visible ? "visible" : "invisible"}`}>
      &#x2022; &#x2022; &#x2022;
    </div>
  )
}
