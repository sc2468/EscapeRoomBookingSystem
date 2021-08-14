import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'
import { InputHTMLAttributes } from 'react'

// any normal input value props + making
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder: string;
  name: string
}

export const InputField: React.FC<InputFieldProps> = ({ label, size, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    // `!!error` converts empty string to boolean
    <FormControl isInvalid={!!error} >
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Input {...field} id={field.name} {...props}></Input>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
