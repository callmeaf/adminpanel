import * as React from "react";
import SocialBotsTable from "./SocialBotsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteSocialBot,
  exportSocialBots,
  forceDeleteSocialBot,
  getSocialBots,
  getSocialBotsTrashed,
  restoreSocialBot,
  updateSocialBotStatus,
  updateSocialBotType,
} from "@/modules/SocialBot/requests/social-bot-requests";
import toSocialBot, { ISocialBotModel } from "../models/SocialBot";
import toPaginate from "@/modules/Base/models/Paginate";
import { localStorageArtisan } from "@/modules/Base/helpers/local-storage-artisan";
import { TOnDatesChange } from "@/modules/Base/components/tables/TableDates";
import moduleConfig from "../module.config";
import { TOnFilter } from "@/modules/Base/components/tables/TableFilter";
import { TOnEdit } from "@/modules/Base/components/tables/actions/TableEditAction";
import { TOnDelete } from "@/modules/Base/components/tables/actions/TableDeleteAction";
import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import { useRouter } from "@/i18n/routing";
import useRoutes from "@/modules/Base/hooks/use-routes";
import { TOnUpdate } from "@/modules/Base/components/tables/actions/TableSelectOptionColumnAction";
import {
  ExportType,
  TOnExport,
} from "@/modules/Base/components/tables/TableExport";
import { TOnRestore } from "@/modules/Base/components/tables/actions/TableRestoreAction";

let TABLE_ID: string;

interface ISocialBotsWrapperProps {
  trashed?: boolean;
}

const SocialBotsWrapper: React.FC<ISocialBotsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "social_bot_trashed_table";
  } else {
    TABLE_ID = "social_bot_list_table";
  }

  const {
    handle: handleGetSocialBots,
    response: responseGetSocialBots,
    loading: loadingGetSocialBots,
  } = useHttp(moduleConfig, trashed ? getSocialBotsTrashed : getSocialBots);

  const handlePageChange = (page: number) =>
    handleGetSocialBots(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetSocialBots(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetSocialBots(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetSocialBots(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetSocialBots(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<ISocialBotModel> = (socialBot) => {
    const socialBotEditRoute = getRouteByName("social_bots_edit", {
      socialBotId: socialBot.id,
    });
    if (socialBotEditRoute) {
      router.push(socialBotEditRoute.href);
    }
  };

  const { handle: handleDeleteSocialBot, loading: loadingDeleteSocialBot } = useHttp(
    moduleConfig,
    trashed ? forceDeleteSocialBot : deleteSocialBot,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteSocialBot.success_message")
              : tr("deleteSocialBot.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<ISocialBotModel> = async (socialBot) => {
    await handleDeleteSocialBot(
      {},
      {
        socialBotId: socialBot.id,
      }
    );
    handleGetSocialBots();
  };

  const { handle: handleRestoreSocialBot, loading: loadingRestoreSocialBot } = useHttp(
    moduleConfig,
    restoreSocialBot,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreSocialBot.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<ISocialBotModel> = async (model) => {
    await handleRestoreSocialBot(
      {},
      {
        socialBotId: model.id,
      }
    );
    handleGetSocialBots();
  };

  React.useEffect(() => {
    handleGetSocialBots(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateSocialBotStatus } = useHttp(
    moduleConfig,
    updateSocialBotStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSocialBotStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateSocialBotType } = useHttp(
    moduleConfig,
    updateSocialBotType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSocialBotType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<ISocialBotModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateSocialBotStatus(
        {
          status: target.value,
        },
        {
          socialBotId: model.id,
        }
      );
    } else {
      handleUpdateSocialBotType(
        {
          type: target.value,
        },
        {
          socialBotId: model.id,
        }
      );
    }
  };

  const { handle: handleExportSocialBots } = useHttp(moduleConfig, exportSocialBots, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportSocialBots.success_message"),
        },
      });
    },
  });
  const handleExport: TOnExport = (type, data) => {
    data = {
      ...(localStorageArtisan.get(TABLE_ID, true) ?? {}),
      page: data.page,
      trashed,
    };
    switch (type) {
      case ExportType.EXCEL: {
        handleExportSocialBots(data, {
          type,
        });
        break;
      }
      default: {
        console.warn(`No export type find for ( ${type} )`);
      }
    }
  };

  return (
    <SocialBotsTable
      tableId={TABLE_ID}
      socialBots={responseGetSocialBots?.data.map((item) => toSocialBot(item)) ?? []}
      paginate={toPaginate({
        links: responseGetSocialBots?.links,
        meta: responseGetSocialBots?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetSocialBots}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteSocialBot}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreSocialBot}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default SocialBotsWrapper;
