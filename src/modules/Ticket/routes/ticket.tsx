import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  AddComment as AddCommentIcon,
  Forum as ForumIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const ticketRoutes: TRoute = (t) => ({
  tickets: moduleConfig.enabled
    ? [
        {
          name: "tickets_index",
          label: t("Ticket.Routes.index"),
          href: "/tickets",
          icon: <ForumIcon />,
        },
        {
          name: "tickets_create",
          label: t("Ticket.Routes.create"),
          href: "/tickets/create",
          icon: <AddCommentIcon />,
        },
        {
          name: "tickets_edit",
          label: t("Ticket.Routes.edit"),
          href: "/tickets/:ticketId/edit",
          showInNavbar: false,
        },
        {
          name: "tickets_trashed",
          label: t("Ticket.Routes.trashed"),
          href: "/tickets/trashed",
          icon: <PersonIcon />,
        },
        {
          name: "tickets_import_excel",
          label: t("Ticket.Routes.import_excel"),
          href: "/tickets/import/excel",
          icon: <PersonIcon />,
        },
      ]
    : [],
});

export default ticketRoutes;
