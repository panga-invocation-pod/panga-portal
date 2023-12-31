import React, { useEffect, useState } from "react"
import Typewriter from "./typewriter/Typewriter"
import { EffectProps } from "./effects_shared"
import LineWriter from "./typewriter/LineWriter"
import WordWriter from "./typewriter/WordWriter"
import LetterWriter from "./typewriter/LetterWriter"

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
  const testText =
    text +
    "\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra, nunc dictum dictum convallis, arcu augue elementum est, sodales pretium quam nunc vel dolor. Aliquam vulputate volutpat massa nec finibus. Nulla libero risus, tincidunt ut iaculis eu, luctus vel nunc. Morbi est dui, blandit in feugiat in, sollicitudin sed urna. Ut sagittis massa in felis malesuada lobortis. Etiam sagittis feugiat elit, ut aliquam ex porttitor vitae. Praesent sed leo neque. Fusce non convallis nibh. Pellentesque lectus risus, fringilla non nulla eu, maximus sodales dui. Donec consectetur feugiat neque at mollis. Etiam lobortis sem eu massa porttitor, quis congue orci eleifend. Nam pretium, elit in mollis ullamcorper, ante nisl lacinia enim, ut molestie massa nulla id dui. Donec ut scelerisque lacus, nec congue leo.\n\nInteger erat eros, euismod in orci ut, blandit molestie urna. Duis lacinia ipsum justo, in ultricies erat eleifend nec. Sed condimentum elementum erat a dictum. Sed a sapien vestibulum, euismod neque sit amet, bibendum dolor. Suspendisse rhoncus ante quis eros iaculis rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis nisl id sem venenatis sagittis. Etiam ante turpis, accumsan lacinia vulputate a, faucibus vehicula magna. Aliquam tellus est, mollis ac rhoncus eget, sagittis eu ipsum. Pellentesque in rutrum eros, quis tincidunt arcu. Integer egestas nulla sit amet sagittis mollis."

  return (
    <div className="robot-effect">
      <LineWriter
        lines={testText.split("\n\n")}
        beforeLineDelay={200}
        betweenLineDelay={300}
        onFinished={onEffectFinished}
      >
        {(line: string, onFinished) => (
          <LetterWriter
            text={line}
            perLetterDelay={30}
            onFinished={onFinished}
          />
        )}
      </LineWriter>
    </div>
  )
}
