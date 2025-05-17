import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ITicketReplyModel } from "../models/TicketReply";
import DropzoneItem from "@/modules/Base/components/forms/Partials/DropzoneItem";

interface ITicketRepliesListItemProps {
  reply: ITicketReplyModel;
  authUserIsSender: boolean;
}

const TicketRepliesListItem: React.FC<ITicketRepliesListItemProps> = ({
  reply,
  authUserIsSender,
}) => {
  const theme = useTheme();
  const isDesktopDevice = useMediaQuery(theme.breakpoints.up("md"));
  const isDarkMode = theme.palette.mode === "dark";

  console.log({ authUserIsSender }, reply.content);
  return (
    <Box
      key={reply.id}
      sx={{
        display: isDesktopDevice ? "flex" : "initial",
        justifyContent: authUserIsSender ? "flex-start" : "flex-end",
      }}
    >
      <Stack
        direction="row"
        sx={{
          maxWidth: isDesktopDevice ? "70%" : "100%",
          flexDirection: authUserIsSender ? "row" : "row-reverse",
          flexWrap: isDesktopDevice ? "initial" : "wrap",
        }}
      >
        <Avatar
          sx={
            isDesktopDevice
              ? {
                  ml: authUserIsSender ? 0 : 1,
                  mr: authUserIsSender ? 1 : 0,
                }
              : {
                  mb: 1,
                }
          }
        >
          {reply.senderIdentifier.charAt(0).toUpperCase()}
        </Avatar>

        <Paper
          elevation={3}
          sx={{
            position: "relative",
            p: 2,
            pb: isDesktopDevice ? 4 : 8,
            bgcolor: authUserIsSender
              ? isDarkMode
                ? "#1976d2"
                : theme.palette.primary.main
              : isDarkMode
              ? theme.palette.grey[800]
              : theme.palette.grey[100],
            color: authUserIsSender
              ? "#fff"
              : isDarkMode
              ? theme.palette.grey[100]
              : theme.palette.text.primary,
            borderRadius: 3,
            borderBottomLeftRadius: authUserIsSender ? 0 : 3,
            borderBottomRightRadius: authUserIsSender ? 3 : 0,
            maxWidth: "100%",
            minWidth: isDesktopDevice ? "50vw" : "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {reply.content}
          </Typography>
          <Box>
            {reply.attachments.map((attachment) => (
              <DropzoneItem key={attachment.id} medium={attachment} />
            ))}
          </Box>
          <Typography
            variant="caption"
            dir="ltr"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 12,
              left: "auto",
              fontSize: "0.75rem",
              opacity: 0.7,
              color: authUserIsSender
                ? "#fff"
                : isDarkMode
                ? "#ccc"
                : "text.secondary",
              textAlign: authUserIsSender ? "right" : "left",
            }}
          >
            {reply.createdAtText}
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default TicketRepliesListItem;
