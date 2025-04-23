import { Grid2 } from "@mui/material";
import * as React from "react";
import DatePicker from "../forms/DatePicker";
import { useTranslations } from "next-intl";
import { UseFormRegisterReturn } from "react-hook-form";
import { localStorageArtisan } from "../../helpers/local-storage-artisan";
import { ITableProps } from "./Table";
import { Moment } from "moment-jalaali";

export type TOnDatesChange = UseFormRegisterReturn["onChange"];

interface ITableDatesProps {
  tableId: ITableProps["id"];
  fromName?: string;
  toName?: string;
  onDateChange: TOnDatesChange;
  fromDateDefaultValue?: Moment;
  toDateDefaultValue?: Moment;
}

const TableDates: React.FC<ITableDatesProps> = ({
  fromName = "created_from",
  toName = "created_to",
  onDateChange,
  tableId,
  fromDateDefaultValue,
  toDateDefaultValue,
}) => {
  const t = useTranslations("Base.Components.Table");

  const handleDateChange: TOnDatesChange = async (e) => {
    localStorageArtisan.update(
      tableId,
      {
        [e.target.name]: e.target.value,
      },
      true
    );

    onDateChange(e);
  };

  return (
    <Grid2 container spacing={5}>
      <Grid2>
        {/* @ts-ignore */}
        <DatePicker
          label={t("created_from")}
          name={fromName}
          size={"small"}
          onChange={handleDateChange}
          defaultValue={fromDateDefaultValue}
        />
      </Grid2>
      <Grid2>
        {/* @ts-ignore */}
        <DatePicker
          label={t("created_to")}
          name={toName}
          size={"small"}
          onChange={handleDateChange}
          defaultValue={toDateDefaultValue}
        />
      </Grid2>
    </Grid2>
  );
};

export default TableDates;
