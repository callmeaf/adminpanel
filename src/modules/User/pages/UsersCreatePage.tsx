"use client";

import UsersForm from "../widgets/UsersForm";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IUserCreatePageProps {}

const UserCreatePage: React.FC<IUserCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
      <UsersForm />
    </DashboardLayout>
  );
};

export default UserCreatePage;
