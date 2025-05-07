"use client";

import SocialBotForms from "../widgets/SocialBotForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toSocialBot, { ISocialBotModel } from "../models/SocialBot";
import useHttp from "@/modules/Base/hooks/use-http";
import { getSocialBotByKey } from "../requests/social-bot-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface ISocialBotEditPageProps {}

const SocialBotEditPage: React.FC<ISocialBotEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [socialBot, setSocialBot] = React.useState<ISocialBotModel | undefined>(undefined);

  const { handle: handleGetSocialBotByKey, loading: loadingGetSocialBotByKey } = useHttp(
    moduleConfig,
    getSocialBotByKey,
    {
      onSuccess: (res) => {
        setSocialBot(toSocialBot(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetSocialBotByKey(
      {},
      {
        key: params.socialBotId,
      }
    );
  }, [params.socialBotId]);

  return (
    <DashboardLayout>
      <Show when={!!socialBot}>
        <Show.When>
          <SocialBotForms socialBotModel={socialBot} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetSocialBotByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default SocialBotEditPage;
