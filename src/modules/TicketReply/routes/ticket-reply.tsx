import { TRoute } from "@/modules/Base/hooks/use-routes";
import {
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Publish as PublishIcon,
} from "@mui/icons-material";
import moduleConfig from "../module.config";

const ticketReplyRoutes: TRoute = (t) => ({
  ticket_replies: moduleConfig.enabled
    ? [
        {
          name: "ticket_replies_index",
          label: t("TicketReply.Routes.index"),
          href: "/ticket_replies",
          icon: <PersonIcon />,
          showInNavbar: false,
        },
        {
          name: "ticket_replies_create",
          label: t("TicketReply.Routes.create"),
          href: "/ticket_replies/create",
          icon: <PersonAddIcon />,
          showInNavbar: false,
        },
        {
          name: "ticket_replies_edit",
          label: t("TicketReply.Routes.edit"),
          href: "/ticket_replies/:ticketReplyId/edit",
          showInNavbar: false,
        },
        {
          name: "ticket_replies_trashed",
          label: t("TicketReply.Routes.trashed"),
          href: "/ticket_replies/trashed",
          icon: <PersonIcon />,
          showInNavbar: false,
        },
        {
          name: "ticket_replies_import_excel",
          label: t("TicketReply.Routes.import_excel"),
          href: "/ticket_replies/import/excel",
          icon: <PublishIcon />,
          showInNavbar: false,
        },
      ]
    : [],
});

export default ticketReplyRoutes;
