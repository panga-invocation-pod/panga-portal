import React from "react"
import { DateTime } from "luxon"

export default function Date({ value }: { value: DateTime }) {
  let format = "cccc dd LLL"
  if (value.year !== DateTime.local().year) format += ", yyyy"

  return <span>{value.toFormat(format)}</span>
}
