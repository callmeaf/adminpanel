"use client";

import VersionForms from "../widgets/VersionForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toVersion, { IVersionModel } from "../models/Version";
import useHttp from "@/modules/Base/hooks/use-http";
import { getVersionByKey } from "../requests/version-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IVersionEditPageProps {}

const VersionEditPage: React.FC<IVersionEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [version, setVersion] = React.useState<IVersionModel | undefined>(undefined);

  const { handle: handleGetVersionByKey, loading: loadingGetVersionByKey } = useHttp(
    moduleConfig,
    getVersionByKey,
    {
      onSuccess: (res) => {
        setVersion(toVersion(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetVersionByKey(
      {},
      {
        key: params.versionId,
      }
    );
  }, [params.versionId]);

  return (
    <DashboardLayout>
      <Show when={!!version}>
        <Show.When>
          <VersionForms versionModel={version} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetVersionByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default VersionEditPage;
