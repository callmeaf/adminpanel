import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const commentRoutes: TRoute = (t) => ({
  comments: moduleConfig.enabled
    ? [
        {
          name: "comments_index",
          label: t("Comment.Routes.index"),
          href: "/comments",
          icon: <PersonIcon />,
        },
        {
          name: "comments_create",
          label: t("Comment.Routes.create"),
          href: "/comments/create",
          icon: <PersonAddIcon />,
        },
        {
          name: "comments_edit",
          label: t("Comment.Routes.edit"),
          href: "/comments/:commentId/edit",
          showInNavbar: false,
        },
        {
          name: "comments_trashed",
          label: t("Comment.Routes.trashed"),
          href: "/comments/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "comments_import_excel",
          label: t("Comment.Routes.import_excel"),
          href: "/comments/import/excel",
          icon: <PublishIcon />,
        },
      ]
    : [],
});

export default commentRoutes;
