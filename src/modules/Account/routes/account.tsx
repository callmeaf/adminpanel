import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const accountRoutes: TRoute = (t) => ({
  accounts: moduleConfig.enabled
    ? [
        {
          name: "accounts_index",
          label: t("Account.Routes.index"),
          href: "/accounts",
          icon: <PersonIcon />,
        },
        {
          name: "accounts_create",
          label: t("Account.Routes.create"),
          href: "/accounts/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "accounts_edit",
          label: t("Account.Routes.edit"),
          href: "/accounts/:accountId/edit",
          showInNavbar: false,
        },
        {
          name: "accounts_trashed",
          label: t("Account.Routes.trashed"),
          href: "/accounts/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "accounts_import_excel",
          label: t("Account.Routes.import_excel"),
          href: "/accounts/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default accountRoutes;
