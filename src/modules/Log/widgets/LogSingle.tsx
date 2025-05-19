import * as React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { ILogModel } from "../models/Log";
import { useTranslations } from "next-intl";
import { jsonArtisan } from "@/modules/Base/helpers/json-artisan";
import { useRouter } from "@/i18n/routing";
import useRoutes from "@/modules/Base/hooks/use-routes";

interface ILogSingleProps {
  log: ILogModel;
}

const LogSingle: React.FC<ILogSingleProps> = ({ log }) => {
  const {
    logName,
    description,
    event,
    subjectId,
    subjectType,
    causerId,
    causerType,
    changes,
  } = log;

  const theme = useTheme();
  const t = useTranslations("Log.Widgets.LogSingle");
  const renderDiff = () => {
    const keys = new Set([
      ...Object.keys(changes.old || {}),
      ...Object.keys(changes.attributes || {}),
    ]);

    return Array.from(keys).map((key) => {
      const oldValue =
        changes.old?.[key] === undefined
          ? undefined
          : jsonArtisan.stringify(changes.old?.[key]);
      const newValue =
        changes.attributes?.[key] === undefined
          ? undefined
          : jsonArtisan.stringify(changes.attributes?.[key]);
      const isChanged = oldValue !== newValue;

      return (
        <Box key={key} mb={4}>
          <Typography variant="subtitle2" color="text.secondary">
            {key}
          </Typography>

          {isChanged ? (
            <Box px={2}>
              {oldValue !== undefined && (
                <Typography
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.error.dark
                        : theme.palette.error.light,
                    color: theme.palette.getContrastText(
                      theme.palette.mode === "dark"
                        ? theme.palette.error.dark
                        : theme.palette.error.light
                    ),
                    p: 1,
                    borderRadius: 1,
                    fontSize: "0.875rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                  }}
                >
                  - {oldValue}
                </Typography>
              )}
              {newValue !== undefined && (
                <Typography
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.success.dark
                        : theme.palette.success.light,
                    color: theme.palette.getContrastText(
                      theme.palette.mode === "dark"
                        ? theme.palette.success.dark
                        : theme.palette.success.light
                    ),
                    p: 1,
                    borderRadius: 1,
                    fontSize: "0.875rem",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                  }}
                >
                  + {newValue}
                </Typography>
              )}
            </Box>
          ) : (
            <Typography sx={{ p: 1 }}>{oldValue}</Typography>
          )}
        </Box>
      );
    });
  };

  const router = useRouter();
  const { getRouteByName } = useRoutes();
  const handleGoToLogsList = () => {
    const route = getRouteByName("logs_index");
    if (route) {
      router.push(route.href);
    }
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleGoToLogsList}
        sx={{ mb: 5 }}
      >
        {t("go_to_logs_list_btn_label")}
      </Button>
      <Typography variant="body1">
        {t("log_group_label")}: <strong>{logName}</strong>
      </Typography>
      <Typography variant="body1">
        {t("event_label")}: <strong>{event}</strong>
      </Typography>
      <Typography variant="body1">
        {t("description_label")}: <strong>{description}</strong>
      </Typography>
      <Typography variant="body1">
        {t("subject_id_label")}: <strong>{subjectId}</strong>
      </Typography>
      <Typography variant="body1">
        {t("subject_type_label")}: <strong>{subjectType}</strong>
      </Typography>
      <Typography variant="body1">
        {t("causer_id_label")}: <strong>{causerId}</strong>
      </Typography>
      <Typography variant="body1">
        {t("causer_type_label")}: <strong>{causerType}</strong>
      </Typography>
      <div className="mt-6">
        <Typography variant="h6" gutterBottom>
          {t("changes_label")}:
        </Typography>
        {renderDiff()}
      </div>
    </Box>
  );
};

export default LogSingle;
