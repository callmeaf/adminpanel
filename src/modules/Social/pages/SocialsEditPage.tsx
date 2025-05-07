"use client";

import SocialForms from "../widgets/SocialForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toSocial, { ISocialModel } from "../models/Social";
import useHttp from "@/modules/Base/hooks/use-http";
import { getSocialByKey } from "../requests/social-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface ISocialEditPageProps {}

const SocialEditPage: React.FC<ISocialEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [social, setSocial] = React.useState<ISocialModel | undefined>(undefined);

  const { handle: handleGetSocialByKey, loading: loadingGetSocialByKey } = useHttp(
    moduleConfig,
    getSocialByKey,
    {
      onSuccess: (res) => {
        setSocial(toSocial(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetSocialByKey(
      {},
      {
        key: params.socialId,
      }
    );
  }, [params.socialId]);

  return (
    <DashboardLayout>
      <Show when={!!social}>
        <Show.When>
          <SocialForms socialModel={social} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetSocialByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default SocialEditPage;
