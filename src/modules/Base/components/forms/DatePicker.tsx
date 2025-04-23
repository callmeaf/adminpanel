"use client";

import * as React from "react";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { Moment } from "moment-jalaali";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
// @ts-ignore
import fa from "moment/src/locale/fa";
import { TextFieldProps } from "@mui/material";
import { digitsFaToEn } from "@persian-tools/persian-tools";

moment.locale("fa", fa);
moment.loadPersian({
  usePersianDigits: true,
});

interface IDatePickerProps {
  label: string;
  defaultValue?: Moment;
  error?: FieldError;
}

type TDatePickerProps = IDatePickerProps &
  UseFormRegisterReturn &
  TextFieldProps;

const DatePicker: React.FC<TDatePickerProps> = ({
  name,
  label,
  onChange,
  ref,
  error,
  defaultValue,
  ...textFieldProps
}) => {
  return (
    <MUIDatePicker
      label={label}
      inputRef={ref}
      onChange={(date) => {
        onChange({
          target: {
            name,
            value: moment(date).isValid()
              ? digitsFaToEn(moment(date).format("YYYY-MM-DD"))
              : "",
          },
        });
      }}
      defaultValue={defaultValue}
      slotProps={{
        field: {
          clearable: true,
        },
        textField: {
          fullWidth: true,
          error: !!error?.message,
          helperText: error?.message,
          ...textFieldProps,
        },
      }}
    />
  );
};

export default DatePicker;
