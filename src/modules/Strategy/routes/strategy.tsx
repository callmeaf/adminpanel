import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const strategyRoutes: TRoute = (t) => ({
  strategies: moduleConfig.enabled
    ? [
        {
          name: "strategies_index",
          label: t("Strategy.Routes.index"),
          href: "/strategies",
          icon: <PersonIcon />,
        },
        {
          name: "strategies_create",
          label: t("Strategy.Routes.create"),
          href: "/strategies/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "strategies_edit",
          label: t("Strategy.Routes.edit"),
          href: "/strategies/:strategyId/edit",
          showInNavbar: false,
        },
        {
          name: "strategies_trashed",
          label: t("Strategy.Routes.trashed"),
          href: "/strategies/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "strategies_import_excel",
          label: t("Strategy.Routes.import_excel"),
          href: "/strategies/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default strategyRoutes;
