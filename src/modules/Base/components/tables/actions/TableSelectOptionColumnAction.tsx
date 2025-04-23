import * as React from "react";
import { IOption } from "../../forms/AutoComplete";
import Select from "../../forms/Select";
import { SelectChangeEvent } from "@mui/material";

export type TOnUpdate<T> = (
  model: T,
  target: {
    value: string;
    name: string;
  }
) => void;

interface ITableSelectOptionColumnActionProps<T> {
  model: T;
  onUpdate: TOnUpdate<T>;
  name: string;
  options: IOption[];
  defaultValue?: string | number;
  disabled: boolean;
}

const TableSelectOptionColumnAction = <T,>({
  onUpdate,
  options,
  defaultValue,
  name,
  model,
  disabled,
}: ITableSelectOptionColumnActionProps<T>) => {
  const handleUpdate = (e: SelectChangeEvent) => {
    onUpdate(model, {
      value: e.target.value,
      name,
    });
  };

  return (
    <Select
      variant="standard"
      label={""}
      name={name}
      onChange={handleUpdate}
      defaultValue={defaultValue ?? ""}
      options={options}
      ref={undefined}
      onBlur={null}
      hasEmptyOption={false}
      size="small"
      disabled={disabled}
    />
  );
};

export default TableSelectOptionColumnAction;
