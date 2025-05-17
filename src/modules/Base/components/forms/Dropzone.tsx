import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Typography, List, TextFieldProps } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { IMediaModel } from "@/modules/Media/models/Media";
import DropzoneItem from "./Partials/DropzoneItem";
import fileArtisan from "../../helpers/file-artisan";

interface IDropzoneProps {
  label: string;
  error?: FieldError;
  value: File[];
  uploadedFiles?: IMediaModel[];
}

export type TDropzonePropsProps = IDropzoneProps &
  UseFormRegisterReturn &
  Omit<TextFieldProps, "error">;

const Dropzone: React.FC<TDropzonePropsProps> = ({
  onChange,
  value = [],
  required = false,
  error,
  label,
  name,
  uploadedFiles = [],
  disabled,
}) => {
  const t = useTranslations("Base.Components.Dropzone");

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<(string | undefined)[]>([]);

  const updateHiddenInput = (files: File[]) => {
    if (hiddenInputRef.current) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      hiddenInputRef.current.files = dataTransfer.files;
    }
  };
  useEffect(() => {
    previews.forEach((url) => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    });

    const newPreviews = (value || []).map((file) =>
      fileArtisan.isImage(file.type) ? URL.createObjectURL(file) : undefined
    );
    setPreviews(newPreviews);

    updateHiddenInput(value);

    return () => {
      newPreviews.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [value?.length]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = [...value, ...acceptedFiles];
    onChange({
      target: {
        name,
        value: newFiles,
      },
    });
  };

  const handleRemove = (index: number) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    onChange({
      target: {
        name,
        value: updatedFiles,
      },
    });
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true,
    noKeyboard: true,
    disabled,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <Box>
      <Typography>{label}</Typography>

      {!disabled && (
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed",
            borderColor: error
              ? "error.main"
              : isDragActive
              ? "primary.main"
              : "grey.400",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            bgcolor: isDragActive ? "grey.100" : "transparent",
            mb: 1,
          }}
        >
          <input {...getInputProps()} />
          <input
            type="file"
            style={{ display: "none" }}
            ref={hiddenInputRef}
            name="files"
            required={required}
          />
          <Typography
            variant="body1"
            color={isDragActive ? "primary" : "textSecondary"}
          >
            {isDragActive
              ? t("drop_files_content")
              : t("drag_and_drop_files_content")}
          </Typography>
          <Button
            variant="outlined"
            onClick={open}
            sx={{ mt: 1 }}
            disabled={disabled}
          >
            {t("choose_files_btn_label")}
          </Button>
        </Box>
      )}

      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mb: 1, display: "block" }}
        >
          {typeof error === "string" ? error : t("choose_files_errors")}
          <br />
          {error.message}
        </Typography>
      )}

      <List dense>
        {value.map((file, idx) => {
          return (
            // @ts-ignore
            <DropzoneItem
              medium={
                // @ts-ignore
                {
                  id: String(idx),
                  url: previews[idx],
                  fileName: file.name,
                  mimeType: file.type,
                  size: file.size,
                  isImage: fileArtisan.isImage(file.type),
                  isPdf: fileArtisan.isPdf(file.type),
                } as IMediaModel
              }
              key={file.name + file.size + file.type + file.lastModified}
              onRemove={(item) => handleRemove(Number(item.id))}
            />
          );
        })}
        {uploadedFiles?.map((medium) => (
          <DropzoneItem medium={medium} key={medium.id} />
        ))}
      </List>
    </Box>
  );
};

export default Dropzone;
