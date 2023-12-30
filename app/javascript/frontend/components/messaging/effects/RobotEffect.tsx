import React, { useEffect, useState } from "react"
import Typewriter from "./typewriter/Typewriter"
import { EffectProps } from "./effects_shared"
import LineWriter from "./typewriter/LineWriter"
import WordWriter from "./typewriter/WordWriter"

export default function RobotEffect({ text, onFinished }: EffectProps) {
  const [effectFinished, setEffectFinished] = useState(false)

  const onEffectFinished = () => {
    if (effectFinished) return

    setEffectFinished(true)
    onFinished()
  }

  useEffect(() => {
    setEffectFinished(false)
  }, [text])

  // return (
  //   <div className="robot-effect">
  //     <Typewriter
  //       text={text.split("\n\n")}
  //       onFinished={onEffectFinished}
  //       cursor={!effectFinished}
  //       speed={30}
  //       random={30}
  //       delay={400}
  //       startDelay={300}
  //     />
  //   </div>
  // )
  return (
    <div className="robot-effect">
      <LineWriter
        lines={text.split("\n\n")}
        delay={800}
        onFinished={onEffectFinished}
      >
        {(line: string, onFinished) => (
          <WordWriter text={line} perLetterDelay={30} onFinished={onFinished} />
        )}
      </LineWriter>
    </div>
  )
}
