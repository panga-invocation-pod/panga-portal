import React from "react"
import { DateTime } from "luxon"
import { Text } from "@chakra-ui/react"

export default function Date({ value }: { value: DateTime }) {
  let format = "cccc dd LLL"
  if (value.year !== DateTime.local().year) format += ", yyyy"

  return <Text>{value.toFormat(format)}</Text>
}
