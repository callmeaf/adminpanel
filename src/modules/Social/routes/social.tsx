import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const socialRoutes: TRoute = (t) => ({
  socials: moduleConfig.enabled
    ? [
        {
          name: "socials_index",
          label: t("Social.Routes.index"),
          href: "/socials",
          icon: <PersonIcon />,
        },
        {
          name: "socials_create",
          label: t("Social.Routes.create"),
          href: "/socials/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "socials_edit",
          label: t("Social.Routes.edit"),
          href: "/socials/:socialId/edit",
          showInNavbar: false,
        },
        {
          name: "socials_trashed",
          label: t("Social.Routes.trashed"),
          href: "/socials/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "socials_import_excel",
          label: t("Social.Routes.import_excel"),
          href: "/socials/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default socialRoutes;
