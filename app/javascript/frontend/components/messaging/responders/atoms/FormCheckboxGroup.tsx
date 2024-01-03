import React from "react"
import { Box, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react"
import { Controller, FieldValues, UseFormReturn } from "react-hook-form"

export type FormCheckboxGroupProps = {
  name: string
  options: { value: string; label: string }[]
}

export default function FormCheckboxGroup({
  name,
  options,
}: FormCheckboxGroupProps) {
  return (
    <div>
      <Controller
        name="sessions"
        render={({ field: { onChange, value } }) => {
          console.log("value", value)
          return (
            <Box mt={4} key="internal">
              <CheckboxGroup
                colorScheme="green"
                value={value}
                onChange={onChange}
              >
                <Stack spacing={2} direction="column">
                  {options.map((option) => (
                    <div key={option.value}>
                      <Checkbox key={option.value} value={option.value}>
                        {option.label}
                      </Checkbox>
                    </div>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Box>
          )
        }}
      />
    </div>
  )
}

{
  /* <CheckboxGroup colorScheme="primary" defaultValue={[]}>
                <Stack spacing={2} direction="column">
                  {data.sessions.map((session) => {
                    const startAt = DateTime.fromISO(session.start_at)
                    const endAt = DateTime.fromISO(session.end_at)

                    // return (
                    //   <Checkbox
                    //     key={session.id}
                    //     value={session.id}
                    //     {...methods.register("sessions")}
                    //   >
                    //     {startAt.toFormat("ccc d LLL")}
                    //     , <TimeRange startAt={startAt} endAt={endAt} />
                    //   </Checkbox>
                    // )
                    return (
                      <CheckboxCustom
                        key={session.id}
                        control={methods.control}
                        {...methods.register("sessions")}
                      >
                        {" "}
                        Nuts
                      </CheckboxCustom>
                    )
                  })}
                </Stack>
              </CheckboxGroup> */
}
