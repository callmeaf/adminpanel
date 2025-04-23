import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const exchangeRoutes: TRoute = (t) => ({
  exchange: moduleConfig.enabled
    ? [
        {
          name: "exchanges_index",
          label: t("Exchange.Routes.index"),
          href: "/exchanges",
          icon: <PersonIcon />,
        },
        {
          name: "exchanges_create",
          label: t("Exchange.Routes.create"),
          href: "/exchanges/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "exchanges_edit",
          label: t("Exchange.Routes.edit"),
          href: "/exchanges/:exchangeId/edit",
          showInNavbar: false,
        },
        {
          name: "exchanges_trashed",
          label: t("Exchange.Routes.trashed"),
          href: "/exchanges/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "exchanges_import_excel",
          label: t("Exchange.Routes.import_excel"),
          href: "/exchanges/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default exchangeRoutes;
