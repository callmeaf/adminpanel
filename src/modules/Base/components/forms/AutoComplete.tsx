import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  CircularProgress,
  InputAdornmentProps,
} from "@mui/material";
import * as React from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import Input, { TInputProps } from "./Input";
import { useTranslations } from "next-intl";
import arrayArtisan from "../../helpers/array-artisan";

export interface IOption {
  id: string;
  label: string;
  value: string;
}

interface IAutoCompleteProps {
  label: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  options: IOption[];
  onOpen?: (e: React.SyntheticEvent) => void;
  loading?: boolean;
  value?: IOption;
  defaultValue?: IOption;
  onlyLoadIfOptionLoaded?: boolean;
  multiple?: boolean;
  onScroll?: (searchValue: string) => void;
  onSearch?: (searchValue: string) => void;
  disabled?: boolean;
}
type TAutoCompleteProps = IAutoCompleteProps & Omit<TInputProps, "error">;

let formAutoCompleteSearchTimeout: NodeJS.Timeout;

type TInputHiddenDefaultValue = ({}: {
  multiple: IAutoCompleteProps["multiple"];
  options: IAutoCompleteProps["options"];
  params: AutocompleteRenderInputParams;
  defaultValue?: IOption | IOption[];
  changeReason?: AutocompleteChangeReason;
}) => string | undefined | IOption[];

const inputHiddenDefaultValue: TInputHiddenDefaultValue = ({
  multiple,
  options,
  params,
  defaultValue,
  changeReason,
}) => {
  if (multiple) {
    const inputPropsStartAdornment =
      (
        params.InputProps.startAdornment as Array<
          React.ReactElement<InputAdornmentProps>
        >
      )?.map((item) => {
        // @ts-ignore
        return item.props.label;
      }) ?? [];

    let selectedLabels = [...inputPropsStartAdornment];
    selectedLabels = arrayArtisan.unique(selectedLabels);

    let selectedOptions = [
      ...options.filter((option) => selectedLabels?.includes(option.label)),
    ];

    if (defaultValue && Array.isArray(defaultValue) && defaultValue.length) {
      selectedOptions = [...selectedOptions, ...defaultValue];
    }

    selectedOptions = selectedOptions.filter((selectedOption) =>
      selectedLabels.includes(selectedOption.label)
    );
    selectedOptions = arrayArtisan.unique(selectedOptions, "value");
    return selectedOptions;
  } else {
    if (options?.length) {
      return options.find(
        (option) =>
          option.label?.toString() === params.inputProps.value?.toString()
      )?.value;
    } else {
      if (changeReason === "clear") {
        return undefined;
      }
      return (defaultValue as IOption)?.value;
    }
  }
};

const AutoComplete: React.FC<TAutoCompleteProps> = ({
  label,
  error,
  options,
  onOpen,
  loading,
  value = null,
  onlyLoadIfOptionLoaded,
  multiple,
  onScroll,
  onSearch,
  onChange,
  onBlur,
  ref,
  name,
  disabled = false,
}) => {
  const t = useTranslations("Base.Components.AutoComplete");
  const [searchValue, setSearchValue] = React.useState("");
  const [changeReason, setChangeReason] = React.useState<
    AutocompleteChangeReason | undefined
  >(undefined);

  const scrollHandler = (event: React.SyntheticEvent<HTMLLIElement>) => {
    if (!onScroll) {
      return;
    }
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.offsetHeight >=
      listboxNode.scrollHeight
    ) {
      onScroll(searchValue);
    }
  };

  const searchHandler = (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (!["selectOption", "reset", "removeOption"].includes(reason)) {
      setSearchValue(value.toString().trim());
    }
  };

  React.useEffect(() => {
    if (!onSearch) {
      return;
    }
    formAutoCompleteSearchTimeout = setTimeout(() => {
      onSearch(searchValue);
    }, 500);

    return () => {
      if (formAutoCompleteSearchTimeout) {
        clearTimeout(formAutoCompleteSearchTimeout);
      }
    };
  }, [searchValue]);

  if (onlyLoadIfOptionLoaded && options.length === 0) {
    return;
  }

  return (
    <Autocomplete
      onInputChange={searchHandler}
      onOpen={onOpen}
      options={options}
      getOptionLabel={(option: IOption) => option.label ?? ""}
      isOptionEqualToValue={(option: IOption, value) =>
        option.value?.toString() === value.value?.toString()
      }
      getOptionKey={(option) => option.value}
      inputValue={multiple ? searchValue : undefined}
      value={value}
      loading={loading}
      loadingText={t("loading_label")}
      noOptionsText={t("no_options")}
      multiple={multiple}
      disableCloseOnSelect={multiple}
      ref={ref}
      getOptionDisabled={() => disabled}
      disableClearable={disabled}
      onChange={(e, onChangeValue, reason) => {
        setChangeReason(reason);
        if (onChange) {
          onChange({
            target: {
              name,
              value: onChangeValue,
            },
          });
        }
      }}
      onBlur={onBlur}
      slotProps={{
        listbox: {
          // @ts-ignore
          onScroll: scrollHandler,
        },
      }}
      renderInput={(params) => {
        const inputHiddenValues = inputHiddenDefaultValue({
          multiple,
          options,
          params,
          defaultValue: value,
          changeReason,
        });

        return (
          <>
            {/* @ts-ignore */}
            <Input
              {...params}
              name={name}
              fullWidth
              label={label}
              variant="standard"
              error={error as FieldError}
              slotProps={{
                input: {
                  ...params.InputProps,
                  "aria-description": "Something",
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
            />

            {multiple ? (
              (inputHiddenValues as IOption[]).map((item, index) => (
                <input
                  key={item.value}
                  type="hidden"
                  id={`${name}[${index}]_hidden`}
                  name={`${name}_hidden[]`}
                  defaultValue={item.value}
                />
              ))
            ) : (
              <input
                type="hidden"
                id={`${name}_hidden`}
                name={`${name}_hidden`}
                defaultValue={inputHiddenValues as string}
              />
            )}
          </>
        );
      }}
    />
  );
};

export default AutoComplete;
