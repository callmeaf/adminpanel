import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const versionRoutes: TRoute = (t) => ({
  versions: moduleConfig.enabled
    ? [
        {
          name: "versions_index",
          label: t("Version.Routes.index"),
          href: "/versions",
          icon: <PersonIcon />,
        },
        {
          name: "versions_create",
          label: t("Version.Routes.create"),
          href: "/versions/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "versions_edit",
          label: t("Version.Routes.edit"),
          href: "/versions/:versionId/edit",
          showInNavbar: false,
        },
        {
          name: "versions_trashed",
          label: t("Version.Routes.trashed"),
          href: "/versions/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "versions_import_excel",
          label: t("Version.Routes.import_excel"),
          href: "/versions/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default versionRoutes;
