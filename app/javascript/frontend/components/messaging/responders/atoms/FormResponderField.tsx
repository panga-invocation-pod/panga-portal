import React from "react"
import { Textarea, FormLabel } from "@chakra-ui/react"
import { ValidatedFormControl } from "../../../utility/forms"
import { nameToTitle } from "../../../utility/strings"
import { IFormResponderField } from "../../types"

const FormResponderTextField = ({ name, placeholder }: IFormResponderField) => {
  return <Textarea name={name} placeholder={placeholder} />
}

const fieldTypes = {
  text: FormResponderTextField,
}

const FormResponderField = ({
  field,
  errors,
}: {
  field: IFormResponderField
  errors: any
}) => {
  const FieldComponent = fieldTypes[field.field_type]
  if (!FieldComponent)
    throw new Error(`Unknown field type: ${field.field_type}`)

  return (
    <ValidatedFormControl fieldError={errors}>
      <FormLabel fontWeight="bold">{nameToTitle(field.name)}</FormLabel>
      <FieldComponent {...field} />
    </ValidatedFormControl>
  )
}

export default FormResponderField
