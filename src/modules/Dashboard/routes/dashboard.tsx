import { TRoute } from "@/modules/Base/hooks/use-routes";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

const dashboardRoutes: TRoute = (t) => ({
  dashboard: [
    {
      name: "dashboard",
      label: t("Dashboard.Routes.index"),
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
  ],
});

export default dashboardRoutes;
