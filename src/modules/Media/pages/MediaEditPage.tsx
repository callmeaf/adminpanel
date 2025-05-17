"use client";

import MediaForms from "../widgets/MediaForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toMedia, { IMediaModel } from "../models/Media";
import useHttp from "@/modules/Base/hooks/use-http";
import { getMediaByKey } from "../requests/media-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IMediaEditPageProps {}

const MediaEditPage: React.FC<IMediaEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [media, setMedia] = React.useState<IMediaModel | undefined>(undefined);

  const { handle: handleGetMediaByKey, loading: loadingGetMediaByKey } = useHttp(
    moduleConfig,
    getMediaByKey,
    {
      onSuccess: (res) => {
        setMedia(toMedia(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetMediaByKey(
      {},
      {
        key: params.mediaId,
      }
    );
  }, [params.mediaId]);

  return (
    <DashboardLayout>
      <Show when={!!media}>
        <Show.When>
          <MediaForms mediaModel={media} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetMediaByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default MediaEditPage;
