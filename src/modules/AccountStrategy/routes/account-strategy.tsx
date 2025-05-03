import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const accountStrategyRoutes: TRoute = (t) => ({
  account_strategies: moduleConfig.enabled
    ? [
        {
          name: "account_strategies_index",
          label: t("AccountStrategy.Routes.index"),
          href: "/account_strategies",
          icon: <PersonIcon />,
        },
        {
          name: "account_strategies_create",
          label: t("AccountStrategy.Routes.create"),
          href: "/account_strategies/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "account_strategies_edit",
          label: t("AccountStrategy.Routes.edit"),
          href: "/account_strategies/:accountStrategyId/edit",
          showInNavbar: false,
        },
        {
          name: "account_strategies_trashed",
          label: t("AccountStrategy.Routes.trashed"),
          href: "/account_strategies/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "account_strategies_import_excel",
          label: t("AccountStrategy.Routes.import_excel"),
          href: "/account_strategies/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default accountStrategyRoutes;
