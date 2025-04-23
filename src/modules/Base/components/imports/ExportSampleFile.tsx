import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import * as React from "react";

interface IExportSampleFileProps {
  onExport: VoidFunction;
  loading: boolean;
}

const ExportSampleFile: React.FC<IExportSampleFileProps> = ({
  onExport,
  loading,
}) => {
  const t = useTranslations("Base.Components.ImportWrapper");

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onExport}
      loading={loading}
    >
      {t("export_sample_file_btn_label")}
    </Button>
  );
};

export default ExportSampleFile;
