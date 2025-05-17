import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const mediaRoutes: TRoute = (t) => ({
  media: moduleConfig.enabled
    ? [
        {
          name: "media_index",
          label: t("Media.Routes.index"),
          href: "/media",
          icon: <PersonIcon />,
          showInNavbar: false,
        },
        {
          name: "media_create",
          label: t("Media.Routes.create"),
          href: "/media/create",
          icon: <PersonAddIcon />,
          showInNavbar: false,
        },
        {
          name: "media_edit",
          label: t("Media.Routes.edit"),
          href: "/media/:mediaId/edit",
          showInNavbar: false,
        },
        {
          name: "media_trashed",
          label: t("Media.Routes.trashed"),
          href: "/media/trashed",
          icon: <PersonIcon />,
          showInNavbar: false,
        },
        {
          name: "media_import_excel",
          label: t("Media.Routes.import_excel"),
          href: "/media/import/excel",
          icon: <PublishIcon />,
          showInNavbar: false,
        },
      ]
    : [],
});

export default mediaRoutes;
