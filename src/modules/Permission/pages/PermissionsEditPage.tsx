"use client";

import PermissionForms from "../widgets/PermissionForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toPermission, { IPermissionModel } from "../models/Permission";
import useHttp from "@/modules/Base/hooks/use-http";
import { getPermissionByKey } from "../requests/permission-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IPermissionEditPageProps {}

const PermissionEditPage: React.FC<IPermissionEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [permission, setPermission] = React.useState<IPermissionModel | undefined>(undefined);

  const { handle: handleGetPermissionByKey, loading: loadingGetPermissionByKey } = useHttp(
    moduleConfig,
    getPermissionByKey,
    {
      onSuccess: (res) => {
        setPermission(toPermission(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetPermissionByKey(
      {},
      {
        key: params.permissionId,
      }
    );
  }, [params.permissionId]);

  return (
    <DashboardLayout>
      <Show when={!!permission}>
        <Show.When>
          <PermissionForms permissionModel={permission} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetPermissionByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default PermissionEditPage;
