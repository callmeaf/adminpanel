import { TextField, TextFieldProps } from "@mui/material";
import * as React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  label: string;
  error?: FieldError;
}

export type TInputProps = IInputProps &
  UseFormRegisterReturn &
  Omit<TextFieldProps, "error">;

const Input: React.FC<TInputProps> = ({
  name,
  label,
  error,
  ref,
  onChange,
  onBlur,
  ...otherProps
}) => {
  return (
    <TextField
      name={name}
      label={label}
      fullWidth
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      helperText={error?.message}
      error={!!error?.message}
      {...otherProps}
    />
  );
};

export default Input;
