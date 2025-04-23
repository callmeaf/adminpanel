import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const coinRoutes: TRoute = (t) => ({
  coins: moduleConfig.enabled
    ? [
        {
          name: "coins_index",
          label: t("Coin.Routes.index"),
          href: "/coins",
          icon: <PersonIcon />,
        },
        {
          name: "coins_create",
          label: t("Coin.Routes.create"),
          href: "/coins/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "coins_edit",
          label: t("Coin.Routes.edit"),
          href: "/coins/:coinId/edit",
          showInNavbar: false,
        },
        {
          name: "coins_trashed",
          label: t("Coin.Routes.trashed"),
          href: "/coins/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "coins_import_excel",
          label: t("Coin.Routes.import_excel"),
          href: "/coins/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default coinRoutes;
