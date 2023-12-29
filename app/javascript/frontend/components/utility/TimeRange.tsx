import { DateTime } from "luxon"
import React from "react"

interface TimeRangeProps {
  startAt: DateTime
  endAt: DateTime | null
}

export function SimpleTime({ time }: { time: DateTime | null }) {
  if (!time) return null

  let formatString
  if (time.minute === 0) formatString = "ha"
  else formatString = "h:mma"

  return time.toFormat(formatString).toLowerCase()
}

export default function TimeRange({ startAt, endAt }: TimeRangeProps) {
  return (
    <span>
      <SimpleTime time={startAt} />
      {endAt && (
        <>
          {" - "}
          <SimpleTime time={endAt} />
        </>
      )}
    </span>
  )
}
