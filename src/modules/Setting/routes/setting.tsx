import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const settingRoutes: TRoute = (t) => ({
  settings: moduleConfig.enabled
    ? [
        {
          name: "settings_index",
          label: t("Setting.Routes.index"),
          href: "/settings",
          icon: <PersonIcon />,
        },
        {
          name: "settings_create",
          label: t("Setting.Routes.create"),
          href: "/settings/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "settings_edit",
          label: t("Setting.Routes.edit"),
          href: "/settings/:settingId/edit",
          showInNavbar: false,
        },
        {
          name: "settings_trashed",
          label: t("Setting.Routes.trashed"),
          href: "/settings/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "settings_import_excel",
          label: t("Setting.Routes.import_excel"),
          href: "/settings/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default settingRoutes;
