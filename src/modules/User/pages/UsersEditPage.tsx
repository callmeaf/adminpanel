"use client";

import UsersForm from "../widgets/UsersForm";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toUser, { IUserModel } from "../models/User";
import useHttp from "@/modules/Base/hooks/use-http";
import { getUserByKey } from "../requests/user-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IUserEditPageProps {}

const UserEditPage: React.FC<IUserEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [user, setUser] = React.useState<IUserModel | undefined>(undefined);

  const { handle: handleGetUserByKey, loading: loadingGetUserByKey } = useHttp(
    moduleConfig,
    getUserByKey,
    {
      onSuccess: (res) => {
        setUser(toUser(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetUserByKey(
      {},
      {
        key: params.userId,
      }
    );
  }, [params.userId]);

  return (
    <DashboardLayout>
      <Show when={!!user}>
        <Show.When>
          <UsersForm userModel={user} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetUserByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default UserEditPage;
