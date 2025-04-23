import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const userRoutes: TRoute = (t) => ({
  users: moduleConfig.enabled
    ? [
        {
          name: "users_index",
          label: t("User.Routes.index"),
          href: "/users",
          icon: <PersonIcon />,
        },
        {
          name: "users_create",
          label: t("User.Routes.create"),
          href: "/users/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "users_edit",
          label: t("User.Routes.edit"),
          href: "/users/:userId/edit",
          showInNavbar: false,
        },
        {
          name: "users_trashed",
          label: t("User.Routes.trashed"),
          href: "/users/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "users_import_excel",
          label: t("User.Routes.import_excel"),
          href: "/users/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default userRoutes;
