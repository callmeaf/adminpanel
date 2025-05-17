import { useTranslations } from "next-intl";
import { Grid2 } from "@mui/material";
import * as React from "react";
import Select from "@/modules/Base/components/forms/Select";
import { IOption } from "@/modules/Base/components/forms/AutoComplete";

interface ITicketRepliesTableFilterProps {
  tableId: string;
  defaultStatusValue?: string;
  defaultTypeValue?: string;
  statuses: IOption[];
  types: IOption[];
}

const TicketRepliesTableFilter: React.FC<ITicketRepliesTableFilterProps> = ({
  tableId,
  defaultStatusValue,
  defaultTypeValue,
  statuses,
  types,
}) => {
  const t = useTranslations("TicketReply.Widgets.Table");

  const storedDefaultStatusValue = React.useMemo(
    () => defaultStatusValue,
    [tableId]
  );
  const storedDefaultTypeValue = React.useMemo(
    () => defaultTypeValue,
    [tableId]
  );
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Select
          label={t("status_label")}
          name="status"
          options={statuses}
          defaultValue={storedDefaultStatusValue}
        />
      </Grid2>
      <Grid2 size={12}>
        <Select
          label={t("type_label")}
          name="type"
          options={types}
          defaultValue={storedDefaultTypeValue}
        />
      </Grid2>
    </Grid2>
  );
};

export default TicketRepliesTableFilter;
