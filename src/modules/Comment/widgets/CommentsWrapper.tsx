import * as React from "react";
import CommentsTable from "./CommentsTable";
import useHttp from "@/modules/Base/hooks/use-http";
import {
  deleteComment,
  exportComments,
  forceDeleteComment,
  getComments,
  getCommentsTrashed,
  restoreComment,
  updateCommentStatus,
  updateCommentType,
} from "@/modules/Comment/requests/comment-requests";
import toComment, { ICommentModel } from "../models/Comment";
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

interface ICommentsWrapperProps {
  trashed?: boolean;
}

const CommentsWrapper: React.FC<ICommentsWrapperProps> = ({ trashed = false }) => {
  if (trashed) {
    TABLE_ID = "comment_trashed_table";
  } else {
    TABLE_ID = "comment_list_table";
  }

  const {
    handle: handleGetComments,
    response: responseGetComments,
    loading: loadingGetComments,
  } = useHttp(moduleConfig, trashed ? getCommentsTrashed : getComments);

  const handlePageChange = (page: number) =>
    handleGetComments(localStorageArtisan.get(TABLE_ID, true));
  const handlePerPageChange = (perPage: number) =>
    handleGetComments(localStorageArtisan.get(TABLE_ID, true));
  const handleSearch = (term: string) =>
    handleGetComments(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );
  const handleDateChange: TOnDatesChange = (e) =>
    handleGetComments(localStorageArtisan.get(TABLE_ID, true));

  const handleFilter: TOnFilter = () =>
    handleGetComments(
      Object.fromEntries(
        Object.entries(localStorageArtisan.get(TABLE_ID, true) ?? {}).filter(
          ([key, value]) => !!String(value).trim()
        )
      )
    );

  const { getRouteByName } = useRoutes();
  const router = useRouter();
  const handleEdit: TOnEdit<ICommentModel> = (comment) => {
    const commentEditRoute = getRouteByName("comments_edit", {
      commentId: comment.id,
    });
    if (commentEditRoute) {
      router.push(commentEditRoute.href);
    }
  };

  const { handle: handleDeleteComment, loading: loadingDeleteComment } = useHttp(
    moduleConfig,
    trashed ? forceDeleteComment : deleteComment,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: trashed
              ? tr("forceDeleteComment.success_message")
              : tr("deleteComment.success_message"),
          },
        });
      },
    }
  );
  const handleDelete: TOnDelete<ICommentModel> = async (comment) => {
    await handleDeleteComment(
      {},
      {
        commentId: comment.id,
      }
    );
    handleGetComments();
  };

  const { handle: handleRestoreComment, loading: loadingRestoreComment } = useHttp(
    moduleConfig,
    restoreComment,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("restoreComment.success_message"),
          },
        });
      },
    }
  );

  const handleRestore: TOnRestore<ICommentModel> = async (model) => {
    await handleRestoreComment(
      {},
      {
        commentId: model.id,
      }
    );
    handleGetComments();
  };

  React.useEffect(() => {
    handleGetComments(localStorageArtisan.get(TABLE_ID, true));
  }, []);

  const { handle: handleUpdateCommentStatus } = useHttp(
    moduleConfig,
    updateCommentStatus,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateCommentStatus.success_message"),
          },
        });
      },
    }
  );

  const { handle: handleUpdateCommentType } = useHttp(
    moduleConfig,
    updateCommentType,
    {
      onSuccess: (res, { uiDispatch, tr }) => {
        uiDispatch({
          type: SET_SNACKBAR,
          payload: {
            type: "success",
            message: tr("updateCommentType.success_message"),
          },
        });
      },
    }
  );

  const handleUpdate: TOnUpdate<ICommentModel> = (model, target) => {
    if (target.name === "status") {
      handleUpdateCommentStatus(
        {
          status: target.value,
        },
        {
          commentId: model.id,
        }
      );
    } else {
      handleUpdateCommentType(
        {
          type: target.value,
        },
        {
          commentId: model.id,
        }
      );
    }
  };

  const { handle: handleExportComments } = useHttp(moduleConfig, exportComments, {
    onSuccess: (res, { uiDispatch, tr }) => {
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "success",
          message: tr("exportComments.success_message"),
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
        handleExportComments(data, {
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
    <CommentsTable
      tableId={TABLE_ID}
      comments={responseGetComments?.data.map((item) => toComment(item)) ?? []}
      paginate={toPaginate({
        links: responseGetComments?.links,
        meta: responseGetComments?.meta,
      })}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
      onSearch={handleSearch}
      onDateChange={handleDateChange}
      onFilter={handleFilter}
      loading={loadingGetComments}
      onEdit={handleEdit}
      onDelete={handleDelete}
      loadingDelete={loadingDeleteComment}
      onRestore={handleRestore}
      loadingRestore={loadingRestoreComment}
      onStatusUpdate={handleUpdate}
      onTypeUpdate={handleUpdate}
      onExport={handleExport}
      trashed={trashed}
    />
  );
};

export default CommentsWrapper;
