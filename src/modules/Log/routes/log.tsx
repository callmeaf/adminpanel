import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const logRoutes: TRoute = (t) => ({
  logs: moduleConfig.enabled
    ? [
        {
          name: "logs_index",
          label: t("Log.Routes.index"),
          href: "/logs",
          icon: <PersonIcon />,
        },
        {
          name: "logs_create",
          label: t("Log.Routes.create"),
          href: "/logs/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "logs_edit",
          label: t("Log.Routes.edit"),
          href: "/logs/:logId/edit",
          showInNavbar: false,
        },
        {
          name: "logs_trashed",
          label: t("Log.Routes.trashed"),
          href: "/logs/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "logs_import_excel",
          label: t("Log.Routes.import_excel"),
          href: "/logs/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default logRoutes;
