import * as React from "react";
import SocialsTable from "./SocialsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteSocial,
  exportSocials,
  forceDeleteSocial,
  getSocials,
  getSocialsTrashed,
  restoreSocial,
  updateSocialStatus,
  updateSocialType,
} from "@/modules/Social/requests/social-requests";
import toSocial, { ISocialModel } from "../models/Social";
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

interface ISocialsWrapperProps {
  trashed?: boolean;
}

const SocialsWrapper: React.FC<ISocialsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "social_trashed_table";
  } else {
    TABLE_ID = "social_list_table";
  }

  const {
    handle: handleGetSocials,
    response: responseGetSocials,
    loading: loadingGetSocials,
  } = useHttp(moduleConfig, trashed ? getSocialsTrashed : getSocials);

  const handlePageChange = (page: number) =>
    handleGetSocials(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetSocials(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetSocials(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetSocials(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetSocials(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<ISocialModel> = (social) => {
    const socialEditRoute = getRouteByName("socials_edit", {
      socialId: social.id,
    });
    if (socialEditRoute) {
      router.push(socialEditRoute.href);
    }
  };

  const { handle: handleDeleteSocial, loading: loadingDeleteSocial } = useHttp(
    moduleConfig,
    trashed ? forceDeleteSocial : deleteSocial,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteSocial.success_message")
              : tr("deleteSocial.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<ISocialModel> = async (social) => {
    await handleDeleteSocial(
      {},
      {
        socialId: social.id,
      }
    );
    handleGetSocials();
  };

  const { handle: handleRestoreSocial, loading: loadingRestoreSocial } = useHttp(
    moduleConfig,
    restoreSocial,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreSocial.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<ISocialModel> = async (model) => {
    await handleRestoreSocial(
      {},
      {
        socialId: model.id,
      }
    );
    handleGetSocials();
  };

  React.useEffect(() => {
    handleGetSocials(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateSocialStatus } = useHttp(
    moduleConfig,
    updateSocialStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSocialStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateSocialType } = useHttp(
    moduleConfig,
    updateSocialType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateSocialType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<ISocialModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateSocialStatus(
        {
          status: target.value,
        },
        {
          socialId: model.id,
        }
      );
    } else {
      handleUpdateSocialType(
        {
          type: target.value,
        },
        {
          socialId: model.id,
        }
      );
    }
  };

  const { handle: handleExportSocials } = useHttp(moduleConfig, exportSocials, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportSocials.success_message"),
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
        handleExportSocials(data, {
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
    <SocialsTable
      tableId={TABLE_ID}
      socials={responseGetSocials?.data.map((item) => toSocial(item)) ?? []}
      paginate={toPaginate({
        links: responseGetSocials?.links,
        meta: responseGetSocials?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetSocials}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteSocial}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreSocial}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default SocialsWrapper;
