"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toLog, { ILogModel } from "../models/Log";
import useHttp from "@/modules/Base/hooks/use-http";
import { getLogByKey } from "../requests/log-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";
import LogSingle from "../widgets/LogSingle";

interface ILogEditPageProps {}

const LogEditPage: React.FC<ILogEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [log, setLog] = React.useState<ILogModel | undefined>(undefined);

  const { handle: handleGetLogByKey, loading: loadingGetLogByKey } = useHttp(
    moduleConfig,
    getLogByKey,
    {
      onSuccess: (res) => {
        setLog(toLog(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetLogByKey(
      {},
      {
        key: params.logId,
      }
    );
  }, [params.logId]);

  return (
    <DashboardLayout>
      <Show when={!!log}>
        <Show.When>
          <LogSingle log={log} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetLogByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default LogEditPage;
