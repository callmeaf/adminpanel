import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const permissionRoutes: TRoute = (t) => ({
  permissions: moduleConfig.enabled
    ? [
        // {
        //   name: "permissions_index",
        //   label: t("Permission.Routes.index"),
        //   href: "/permissions",
        //   icon: <PersonIcon />,
        // },
        // {
        //   name: "permissions_create",
        //   label: t("Permission.Routes.create"),
        //   href: "/permissions/create",
        //   icon: <PersonAddIcon />,
        // },
        // {
        //   name: "permissions_edit",
        //   label: t("Permission.Routes.edit"),
        //   href: "/permissions/:permissionId/edit",
        //   showInNavbar: false,
        // },
        // {
        //   name: "permissions_trashed",
        //   label: t("Permission.Routes.trashed"),
        //   href: "/permissions/trashed",
        //   icon: <PersonIcon />,
        // },
        // {
        //   name: "permissions_import_excel",
        //   label: t("Permission.Routes.import_excel"),
        //   href: "/permissions/import/excel",
        //   icon: <PublishIcon />,
        // },
      ]
    : [],
});

export default permissionRoutes;
