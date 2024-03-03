import React from "react"
import { Textarea, FormLabel, Input } from "@chakra-ui/react"
import { ValidatedFormControl } from "../../../utility/forms"
import { nameToTitle } from "../../../utility/strings"
import {
  IFormResponderCheckboxGroupField,
  IFormResponderEmailField,
  IFormResponderField,
  IFormResponderTextField,
} from "../../types"
import FormCheckboxGroup from "./FormCheckboxGroup"

interface IResponderFieldProps {
  registerProps: any
}

const FormResponderTextField = ({
  field,
  registerProps,
}: IResponderFieldProps & { field: IFormResponderTextField }) => {
  return (
    <Textarea
      name={field.name}
      placeholder={field.placeholder}
      rows={5}
      {...registerProps}
    />
  )
}

const FormResponderEmailField = ({
  field,
  registerProps,
}: IResponderFieldProps & { field: IFormResponderEmailField }) => {
  return (
    <Input
      name={field.name}
      type="email"
      placeholder={field.placeholder}
      {...registerProps}
    />
  )
}

const FormResponderCheckboxGroupField = ({
  field,
}: IResponderFieldProps & { field: IFormResponderCheckboxGroupField }) => (
  <FormCheckboxGroup name={field.name} options={field.options} />
)

const fieldTypes = {
  text: FormResponderTextField,
  checkbox_group: FormResponderCheckboxGroupField,
  email: FormResponderEmailField,
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
      {field.label !== null && (
        <FormLabel fontWeight="bold">
          {field.label || nameToTitle(field.name)}
        </FormLabel>
      )}
      <FieldComponent field={field as any} registerProps={registerProps} />
    </ValidatedFormControl>
  )
}

export default FormResponderField
