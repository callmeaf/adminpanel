import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const socialBotRoutes: TRoute = (t) => ({
  social_bots: moduleConfig.enabled
    ? [
        {
          name: "social_bots_index",
          label: t("SocialBot.Routes.index"),
          href: "/social_bots",
          icon: <PersonIcon />,
        },
        {
          name: "social_bots_create",
          label: t("SocialBot.Routes.create"),
          href: "/social_bots/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "social_bots_edit",
          label: t("SocialBot.Routes.edit"),
          href: "/social_bots/:socialBotId/edit",
          showInNavbar: false,
        },
        {
          name: "social_bots_trashed",
          label: t("SocialBot.Routes.trashed"),
          href: "/social_bots/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "social_bots_import_excel",
          label: t("SocialBot.Routes.import_excel"),
          href: "/social_bots/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default socialBotRoutes;
