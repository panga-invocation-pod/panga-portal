import React from "react"
import { DateTime } from "luxon"

interface TimeRangeProps {
  startAt: DateTime
  endAt: DateTime | null
}

export function SimpleTime({
  time,
  showMinutes,
}: {
  time: DateTime | null
  showMinutes?: boolean
}) {
  if (!time) return null

  let formatString

  if (
    showMinutes == false ||
    (showMinutes == undefined && time.minute.valueOf() === 0)
  )
    formatString = "ha"
  else formatString = "h:mm a"

  return time.toFormat(formatString).toLowerCase()
}

export default function TimeRange({ startAt, endAt }: TimeRangeProps) {
  const showMinutes =
    startAt.minute.valueOf() !== 0 || endAt?.minute.valueOf() !== 0

  return (
    <span>
      <SimpleTime time={startAt} showMinutes={showMinutes} />
      {endAt && (
        <>
          {" - "}
          <SimpleTime time={endAt} showMinutes={showMinutes} />
        </>
      )}
    </span>
  )
}
