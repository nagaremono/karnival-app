'use client';
import { Input, Field, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import { HTMLInputTypeAttribute } from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  textArea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  type,
  required,
  textArea,
}) => {
  const [field, meta] = useField(name);

  return (
    <>
      <Field.Root required={required} invalid={!!meta.error}>
        <Field.Label>{label}</Field.Label>
        {textArea ? (
          <Textarea placeholder={placeholder} {...field} />
        ) : (
          <Input placeholder={placeholder} type={type} {...field} />
        )}
        {meta.error && <Field.ErrorText>{meta.error}</Field.ErrorText>}
      </Field.Root>
    </>
  );
};

export default InputField;
