"use client";

import SettingForms from "../widgets/SettingForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toSetting, { ISettingModel } from "../models/Setting";
import useHttp from "@/modules/Base/hooks/use-http";
import { getSettingByKey } from "../requests/setting-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface ISettingEditPageProps {}

const SettingEditPage: React.FC<ISettingEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [setting, setSetting] = React.useState<ISettingModel | undefined>(undefined);

  const { handle: handleGetSettingByKey, loading: loadingGetSettingByKey } = useHttp(
    moduleConfig,
    getSettingByKey,
    {
      onSuccess: (res) => {
        setSetting(toSetting(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetSettingByKey(
      {},
      {
        key: params.settingId,
      }
    );
  }, [params.settingId]);

  return (
    <DashboardLayout>
      <Show when={!!setting}>
        <Show.When>
          <SettingForms settingModel={setting} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetSettingByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default SettingEditPage;
