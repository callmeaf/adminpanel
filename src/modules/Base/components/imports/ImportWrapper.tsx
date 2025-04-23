import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid2,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import * as React from "react";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import ImportExcelStructure, { IImportFileRow } from "./ImportExcelStructure";
import ExportSampleFile from "./ExportSampleFile";

export enum ImportType {
  EXCEL = "excel",
}

export enum ImportRowType {
  STRING = "string",
  NUMBER = "number",
}

const importTypeExtenstions = {
  [ImportType.EXCEL]: [".xlsx", ".xls"],
};

export type TOnFileUpload = (type: ImportType, file: File) => Promise<void>;

export type TErrorGroup = { [key: string]: string[] };

export type TOnExportSampleFile = (type: ImportType) => void;

interface IImportWrapperProps {
  type: ImportType;
  maxSize: number;
  onFileUpload: TOnFileUpload;
  total: number;
  success: number;
  errors: TErrorGroup;
  rows: IImportFileRow[];
  onExportSampleFile: TOnExportSampleFile;
  loadingExportSampleFile: boolean;
}

const ImportWrapper: React.FC<IImportWrapperProps> = ({
  type,
  maxSize,
  onFileUpload,
  total,
  success,
  errors,
  rows,
  onExportSampleFile,
  loadingExportSampleFile,
}) => {
  const t = useTranslations("Base.Components.ImportWrapper");

  const [file, setFile] = React.useState<File | null>(null);
  const [dragOver, setDragOver] = React.useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const uploadedFile = event.dataTransfer.files?.[0] || null;
    setFile(uploadedFile);
  };

  React.useEffect(() => {
    if (file instanceof File) {
      onFileUpload(type, file).catch((err) => setFile(null));
    }
  }, [file]);

  return (
    <Grid2 container spacing={2} m={4}>
      <Grid2 size={12}>
        {/* Upload Card */}
        <Card
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: 3,
            boxShadow: 4,
            border: dragOver ? "2px dashed #1976d2" : "2px dashed transparent",
            backgroundColor: dragOver ? "#f0f8ff" : "white",
            transition: "all 0.3s",
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent>
            <CloudUploadIcon sx={{ fontSize: 50, color: "primary.main" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {t("upload_file_label", { type })}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t("upload_file_desc", { type })}
            </Typography>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                {t("choose_file_btn_label", { type })}
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                {file.name}
              </Typography>
            )}
            <Grid2 container spacing={3}>
              {total > 0 && (
                <Grid2 size={12}>
                  <Alert severity="info">
                    {t("total_imported_data", { total })}
                  </Alert>
                </Grid2>
              )}
              {success > 0 && (
                <Grid2 size={12}>
                  <Alert severity="success">
                    {t("uploaded_success_message", {
                      success: success,
                    })}
                  </Alert>
                </Grid2>
              )}
              {Object.keys(errors).map((key) => (
                <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={key}>
                  <Alert severity="error" key={key} sx={{ mb: 3 }}>
                    <AlertTitle>Row {key}</AlertTitle>
                    {errors[key].map((err) => (
                      <p key={err}>{err}</p>
                    ))}
                  </Alert>
                </Grid2>
              ))}
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>

      <Grid2 size={12}>
        {/* Description Card */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6">
              {t("upload_guide_label", { type })}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {t("upload_guide_desc", {
                extenstions: importTypeExtenstions[type].join(", "),
              })}
              <br />
              {t("upload_file_size_label", {
                size: maxSize,
              })}
              <br />
              {t("upload_file_same_column_label")}
            </Typography>
            <Box mt={3} />
            <ImportExcelStructure rows={rows} />
            <Box mt={3} />
            <ExportSampleFile
              onExport={onExportSampleFile.bind(null, type)}
              loading={loadingExportSampleFile}
            />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default ImportWrapper;
