import { IMediaModel } from "@/modules/Media/models/Media";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import {
  PictureAsPdf as PictureAsPdfIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
interface IDropzoneItemProps {
  medium: IMediaModel;
  onRemove?: (medium: IMediaModel) => void;
}

const DropZoneMimeTypeItem = (medium: IMediaModel) => {
  switch (true) {
    case medium.isImage: {
      return (
        <Avatar
          variant="rounded"
          src={medium.url}
          sx={{ width: 48, height: 48 }}
        />
      );
    }
    case medium.isPdf: {
      return <PictureAsPdfIcon />;
    }
    default: {
      return null;
    }
  }
};

const DropzoneItem: React.FC<IDropzoneItemProps> = ({ medium, onRemove }) => {
  const handleFullScreenPreview = () => {
    if (!medium.url) {
      return;
    }

    window.open(medium.url, "_blank");
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(medium);
    }
  };
  return (
    <ListItem
      divider
      secondaryAction={
        onRemove ? (
          <IconButton edge="end" color="error" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        ) : undefined
      }
    >
      <ListItemAvatar
        onClick={handleFullScreenPreview}
        sx={{ cursor: medium.url ? "pointer" : "initial" }}
      >
        {DropZoneMimeTypeItem(medium)}
      </ListItemAvatar>

      <ListItemText
        primary={medium.fileName}
        secondary={`${(medium.size / 1024).toFixed(2)} KB`}
      />
    </ListItem>
  );
};

export default DropzoneItem;
