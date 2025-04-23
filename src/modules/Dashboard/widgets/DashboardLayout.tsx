import useHttp from "@/modules/Base/hooks/use-http";
import { getUser } from "@/modules/Auth/requests/auth-requests";
import AppBar from "@/modules/Dashboard/widgets/AppBar";
import { Card, CardContent } from "@mui/material";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import { useLocale } from "next-intl";
import authModuleConfig from "@/modules/Auth/module.config";

interface IDashboardLayoutProps {
  withCardWrapper?: boolean;
}

const DashboardLayout: React.FC<
  React.PropsWithChildren<IDashboardLayoutProps>
> = ({ children, withCardWrapper = true }) => {
  const locale = useLocale();

  const { handle } = useHttp(authModuleConfig, getUser);
  React.useEffect(() => {
    handle();
  }, []);

  return (
    <LocalizationProvider
      dateAdapter={AdapterMomentJalaali}
      adapterLocale={"fa"}
    >
      <main>
        <AppBar />
        {withCardWrapper ? (
          <Card sx={{ m: 3 }}>
            <CardContent>{children}</CardContent>
          </Card>
        ) : (
          children
        )}
      </main>
    </LocalizationProvider>
  );
};

export default DashboardLayout;
