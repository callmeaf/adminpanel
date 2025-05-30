"use client";

import RoleForms from "../widgets/RoleForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toRole, { IRoleModel } from "../models/Role";
import useHttp from "@/modules/Base/hooks/use-http";
import { getRoleByKey } from "../requests/role-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IRoleEditPageProps {}

const RoleEditPage: React.FC<IRoleEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [role, setRole] = React.useState<IRoleModel | undefined>(undefined);

  const { handle: handleGetRoleByKey, loading: loadingGetRoleByKey } = useHttp(
    moduleConfig,
    getRoleByKey,
    {
      onSuccess: (res) => {
        setRole(toRole(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetRoleByKey(
      {},
      {
        key: params.roleId,
      }
    );
  }, [params.roleId]);

  return (
    <DashboardLayout>
      <Show when={!!role}>
        <Show.When>
          <RoleForms roleModel={role} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetRoleByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default RoleEditPage;
