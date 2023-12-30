import React from "react"
import { Textarea, FormLabel } from "@chakra-ui/react"
import { ValidatedFormControl } from "../../../utility/forms"
import { nameToTitle } from "../../../utility/strings"
import { IFormResponderField } from "../../types"

interface IResponderFieldProps {
  registerProps: any
}

const FormResponderTextField = ({
  name,
  placeholder,
  registerProps,
}: IFormResponderField & IResponderFieldProps) => {
  return <Textarea name={name} placeholder={placeholder} {...registerProps} />
}

const fieldTypes = {
  text: FormResponderTextField,
}

const FormResponderField = ({
  field,
  errors,
  registerProps,
}: {
  field: IFormResponderField
  errors: any
  registerProps: any
}) => {
  const FieldComponent = fieldTypes[field.field_type]
  if (!FieldComponent)
    throw new Error(`Unknown field type: ${field.field_type}`)

  return (
    <ValidatedFormControl fieldError={errors}>
      <FormLabel fontWeight="bold">{nameToTitle(field.name)}</FormLabel>
      <FieldComponent {...field} registerProps={registerProps} />
    </ValidatedFormControl>
  )
}

export default FormResponderField
