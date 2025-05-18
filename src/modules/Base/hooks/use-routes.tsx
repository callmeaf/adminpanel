// [IMPORT MODULE ROUTES]
import coinRoutes from "@/modules/Coin/routes/coin";
import dashboardRoutes from "@/modules/Dashboard/routes/dashboard";
import exchangeRoutes from "@/modules/Exchange/routes/exchange";
import userRoutes from "@/modules/User/routes/user";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect } from "react";
import settingRoutes from "@/modules/Setting/routes/setting";
import accountRoutes from "@/modules/Account/routes/account";
import strategyRoutes from "@/modules/Strategy/routes/strategy";
import accountStrategyRoutes from "@/modules/AccountStrategy/routes/account-strategy";
import accountStrategyCoinRoutes from "@/modules/AccountStrategyCoin/routes/account-strategy-coin";
import versionRoutes from "@/modules/Version/routes/version";
import socialRoutes from "@/modules/Social/routes/social";
import socialBotRoutes from "@/modules/SocialBot/routes/social-bot";
import ticketRoutes from "@/modules/Ticket/routes/ticket";
import ticketReplyRoutes from "@/modules/TicketReply/routes/ticket-reply";
import mediaRoutes from "@/modules/Media/routes/media";
import logRoutes from "@/modules/Log/routes/log";
// [END IMPORT MODULE ROUTES]

interface IRoute {
  name: string;
  label: string;
  href: string;
  icon?: ReactNode;
  showInNavbar?: boolean;
}

export interface IRoutes {
  [key: string]: IRoute[];
}
export type TRoute = (t: ReturnType<typeof useTranslations>) => IRoutes;

export interface IRouteParams {
  [key: string]: string | number;
}

type TGetRouteByName = (
  name: string,
  params?: IRouteParams
) => undefined | IRoute;

type TUseRoutes = () => {
  routes: IRoutes;
  getRouteByName: TGetRouteByName;
};

const useRoutes: TUseRoutes = () => {
  const t = useTranslations();

  const routes: IRoutes = {
    // [ROUTES ENTRIES]
    ...dashboardRoutes(t),
    ...userRoutes(t),
    ...exchangeRoutes(t),
    ...coinRoutes(t),
        ...settingRoutes(t),
    ...accountRoutes(t),
    ...strategyRoutes(t),
    ...accountStrategyRoutes(t),
    ...accountStrategyCoinRoutes(t),
    ...versionRoutes(t),
    ...socialRoutes(t),
    ...socialBotRoutes(t),
    ...ticketRoutes(t),
    ...ticketReplyRoutes(t),
    ...mediaRoutes(t),
    ...logRoutes(t),
// [END ROUTES ENTRIES]
  };

  useEffect(() => {}, []);

  const getRouteByName: TGetRouteByName = (name, params = {}) => {
    const allRoutes = Object.keys(routes)
      .map((routeKey) => routes[routeKey])
      .reduce((prev, current) => [...prev, ...current], []);

    const currentRoute = allRoutes.find((route) => route.name === name);
    if (currentRoute) {
      let href = currentRoute.href;
      for (const key in params) {
        href = href.replace(`:${key}`, params[key].toString());
      }

      currentRoute.href = href;
    }

    return currentRoute;
  };

  return {
    routes,
    getRouteByName,
  };
};

export default useRoutes;
