import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const roleRoutes: TRoute = (t) => ({
  roles: moduleConfig.enabled
    ? [
        {
          name: "roles_index",
          label: t("Role.Routes.index"),
          href: "/roles",
          icon: <PersonIcon />,
        },
        {
          name: "roles_create",
          label: t("Role.Routes.create"),
          href: "/roles/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "roles_edit",
          label: t("Role.Routes.edit"),
          href: "/roles/:roleId/edit",
          showInNavbar: false,
        },
        {
          name: "roles_trashed",
          label: t("Role.Routes.trashed"),
          href: "/roles/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "roles_import_excel",
          label: t("Role.Routes.import_excel"),
          href: "/roles/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default roleRoutes;
