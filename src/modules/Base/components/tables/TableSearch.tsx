import * as React from "react";
import Input from "../forms/Input";
import { localStorageArtisan } from "../../helpers/local-storage-artisan";
import { ITableProps } from "./Table";
import { useTranslations } from "next-intl";
import { IconButton, InputAdornment } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export type TOnSearch = (term: string) => void;

interface ITableSearchProps {
  tableId: ITableProps["id"];
  onSearch: TOnSearch;
  params: {
    label: string;
    key: string;
  }[];
  defaultValue: string;
}

let searchTimeout: NodeJS.Timeout;

const TableSearch: React.FC<ITableSearchProps> = ({
  onSearch,
  tableId,
  params,
  defaultValue,
}) => {
  const t = useTranslations("Base.Components.Table");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.trim();

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
      localStorageArtisan.update(
        tableId,
        params.reduce(
          (prev, current) => ({
            ...prev,
            [current.key]: term,
          }),
          {
            term,
            page: 1,
          }
        ),
        true
      );
      onSearch(term);
    }, 500);
  };

  const searchInpRef = React.useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (searchInpRef.current) {
      searchInpRef.current.value = "";
      handleSearch({
        target: {
          value: "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    // @ts-ignore
    <Input
      inputRef={searchInpRef}
      label={`${t("search_label")} ${params
        .map((param) => param.label)
        .join(", ")}`}
      name={"search"}
      onInput={handleSearch}
      defaultValue={defaultValue}
      size="small"
      slotProps={{
        input: {
          endAdornment: defaultValue ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClear}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
};

export default TableSearch;
