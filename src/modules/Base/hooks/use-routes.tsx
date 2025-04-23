import dashboardRoutes from "@/modules/Dashboard/routes/dashboard";
import exchangeRoutes from "@/modules/Exchange/routes/exchange";
import userRoutes from "@/modules/User/routes/user";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect } from "react";

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

type TGetRouteByName = (
  name: string,
  params?: {
    [key: string]: string | number;
  }
) => undefined | IRoute;

type TUseRoutes = () => {
  routes: IRoutes;
  getRouteByName: TGetRouteByName;
};

const useRoutes: TUseRoutes = () => {
  const t = useTranslations();

  const routes: IRoutes = {
    ...dashboardRoutes(t),
    ...userRoutes(t),
    ...exchangeRoutes(t),
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
