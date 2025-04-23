import * as React from "react";
import {
  Select as SelectMUI,
  SelectProps,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { IOption } from "./AutoComplete";
import { useTranslations } from "next-intl";

interface ISelectProps {
  label: string;
  error?: FieldError;
  options: IOption[];
  hasEmptyOption?: boolean;
}
export type TSelectProps = ISelectProps &
  UseFormRegisterReturn &
  Omit<SelectProps, "error">;

const Select: React.FC<TSelectProps> = ({
  ref,
  onBlur,
  onChange,
  label,
  name,
  options,
  defaultValue = "",
  hasEmptyOption = true,
  ...otherProps
}) => {
  const t = useTranslations("Base.Components.Select");

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      {/* @ts-ignore */}
      <SelectMUI
        label={label}
        name={name}
        onChange={onChange}
        ref={ref}
        onBlur={onBlur}
        defaultValue={defaultValue}
        {...otherProps}
      >
        {hasEmptyOption && (
          <MenuItem value={""}>{t("choose_option_label")}</MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  );
};

export default Select;
