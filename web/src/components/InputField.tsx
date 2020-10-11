import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/core';
import { useField } from 'formik';
import React from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  textarea,
  size: _,
  ...props
}) => {
  let InputTextorTextArea = Input;

  if (textarea) {
    InputTextorTextArea = Textarea;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl mt={6} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputTextorTextArea
        {...field}
        {...props}
        id={field.name}
        placeholder={placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
