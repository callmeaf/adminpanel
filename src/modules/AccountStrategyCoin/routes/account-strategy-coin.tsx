import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const accountStrategyCoinRoutes: TRoute = (t) => ({
  account_strategy_coins: moduleConfig.enabled
    ? [
        {
          name: "account_strategy_coins_index",
          label: t("AccountStrategyCoin.Routes.index"),
          href: "/account_strategy_coins",
          icon: <PersonIcon />,
          showInNavbar: false,
        },
        {
          name: "account_strategy_coins_create",
          label: t("AccountStrategyCoin.Routes.create"),
          href: "/account_strategy_coins/create",
          icon: <PersonAddIcon />,
          showInNavbar: false,
        },
        {
          name: "account_strategy_coins_edit",
          label: t("AccountStrategyCoin.Routes.edit"),
          href: "/account_strategy_coins/:accountStrategyCoinId/edit",
          showInNavbar: false,
        },
        {
          name: "account_strategy_coins_trashed",
          label: t("AccountStrategyCoin.Routes.trashed"),
          href: "/account_strategy_coins/trashed",
          icon: <PersonIcon />,
          showInNavbar: false,
        },
        {
          name: "account_strategy_coins_import_excel",
          label: t("AccountStrategyCoin.Routes.import_excel"),
          href: "/account_strategy_coins/import/excel",
          icon: <PublishIcon />,
          showInNavbar: false,
        },
      ]
    : [],
});

export default accountStrategyCoinRoutes;
