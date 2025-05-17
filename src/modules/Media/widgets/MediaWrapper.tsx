import * as React from "react";
import MediaTable from "./MediaTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteMedia,
  exportMedia,
  forceDeleteMedia,
  getMedia,
  getMediaTrashed,
  restoreMedia,
  updateMediaStatus,
  updateMediaType,
} from "@/modules/Media/requests/media-requests";
import toMedia, { IMediaModel } from "../models/Media";
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

interface IMediaWrapperProps {
  trashed?: boolean;
}

const MediaWrapper: React.FC<IMediaWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "media_trashed_table";
  } else {
    TABLE_ID = "media_list_table";
  }

  const {
    handle: handleGetMedia,
    response: responseGetMedia,
    loading: loadingGetMedia,
  } = useHttp(moduleConfig, trashed ? getMediaTrashed : getMedia);

  const handlePageChange = (page: number) =>
    handleGetMedia(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetMedia(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetMedia(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetMedia(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetMedia(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<IMediaModel> = (media) => {
    const mediaEditRoute = getRouteByName("media_edit", {
      mediaId: media.id,
    });
    if (mediaEditRoute) {
      router.push(mediaEditRoute.href);
    }
  };

  const { handle: handleDeleteMedia, loading: loadingDeleteMedia } = useHttp(
    moduleConfig,
    trashed ? forceDeleteMedia : deleteMedia,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteMedia.success_message")
              : tr("deleteMedia.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<IMediaModel> = async (media) => {
    await handleDeleteMedia(
      {},
      {
        mediaId: media.id,
      }
    );
    handleGetMedia();
  };

  const { handle: handleRestoreMedia, loading: loadingRestoreMedia } = useHttp(
    moduleConfig,
    restoreMedia,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreMedia.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<IMediaModel> = async (model) => {
    await handleRestoreMedia(
      {},
      {
        mediaId: model.id,
      }
    );
    handleGetMedia();
  };

  React.useEffect(() => {
    handleGetMedia(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateMediaStatus } = useHttp(
    moduleConfig,
    updateMediaStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateMediaStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateMediaType } = useHttp(
    moduleConfig,
    updateMediaType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateMediaType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<IMediaModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateMediaStatus(
        {
          status: target.value,
        },
        {
          mediaId: model.id,
        }
      );
    } else {
      handleUpdateMediaType(
        {
          type: target.value,
        },
        {
          mediaId: model.id,
        }
      );
    }
  };

  const { handle: handleExportMedia } = useHttp(moduleConfig, exportMedia, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportMedia.success_message"),
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
        handleExportMedia(data, {
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
    <MediaTable
      tableId={TABLE_ID}
      media={responseGetMedia?.data.map((item) => toMedia(item)) ?? []}
      paginate={toPaginate({
        links: responseGetMedia?.links,
        meta: responseGetMedia?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetMedia}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteMedia}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreMedia}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default MediaWrapper;
