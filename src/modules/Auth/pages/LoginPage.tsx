"use client";

import React from "react";
import AuthLayout from "../widgets/AuthLayout";
import LoginWrapper from "../widgets/LoginWrapper";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

const LoginPage = () => {
  usePage(moduleConfig);

  return (
    <AuthLayout>
      <LoginWrapper />
    </AuthLayout>
  );
};

export default LoginPage;
