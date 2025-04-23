import useHttp from "@/modules/Base/hooks/use-http";
import * as React from "react";
import moduleConfig from "../module.config";
import { getUser } from "../requests/auth-requests";

interface IAuthLayoutProps {}

const AuthLayout: React.FC<React.PropsWithChildren<IAuthLayoutProps>> = ({
  children,
}) => {
  const { handle } = useHttp(moduleConfig, getUser, {
    onSuccess: (res, { router }) => {
      router.replace(process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL as string);
    },
  });
  React.useEffect(() => {
    handle();
  }, []);

  return <div>{children}</div>;
};

export default AuthLayout;
