'use client';
import { Input, Field } from '@chakra-ui/react';
import { useField } from 'formik';
import { HTMLInputTypeAttribute } from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
};

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  type,
}) => {
  const [field, meta] = useField(name);

  return (
    <>
      <Field.Root required invalid={!!meta.error}>
        <Field.Label>{label}</Field.Label>
        <Input placeholder={placeholder} type={type} {...field} />
        {meta.error && <Field.ErrorText>{meta.error}</Field.ErrorText>}
      </Field.Root>
    </>
  );
};

export default InputField;
