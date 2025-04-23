import { SET_SNACKBAR } from "@/modules/UI/context/action-types";
import { TUiAction } from "@/modules/UI/context/reducer";
import { UiContext } from "@/modules/UI/context/ui-context";
import AuthTokenExpiredError from "@/modules/Auth/errors/AuthTokenExpiredError";
import api from "@/modules/Base/helpers/api";
import { useRouter } from "@/i18n/routing";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useTranslations } from "next-intl";
import { NextRouter } from "next/router";
import { Dispatch, useContext, useState } from "react";
import { IModuleConfig } from "../module.config";

interface IPaginateResponse {
  links: {
    first: string;
    last: string;
    prev: null | string;
    next: null | string;
  };
  meta: {
    current_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    last_page: number;
    path: string;
    links: {
      url: null | string;
      label: string;
      active: boolean;
    }[];
  };
}

export interface IResponse<T = any, WithPaginate extends boolean = false> {
  data: T;
  links?: WithPaginate extends true ? IPaginateResponse["links"] : never;
  meta?: WithPaginate extends true ? IPaginateResponse["meta"] : never;
}

type TRequest<R> = (
  api: AxiosInstance,
  ...args: any
) => Promise<AxiosResponse<IResponse<R>>>;

interface IOptions<R> {
  onSuccess?: (
    res: IResponse<R>,
    extra: {
      router: NextRouter;
      uiDispatch: Dispatch<TUiAction>;
      tr: ReturnType<typeof useTranslations>;
    }
  ) => void;
  onError?: (err: AxiosError | AuthTokenExpiredError | Error) => void;
  onFinal?: VoidFunction;
}

interface IUseHttpReturnType<R> {
  response: null | IResponse<R>;
  error: null | any;
  loading: boolean;
  handle: (...args: any) => Promise<any>;
}

type TUseHttp = <R>(
  moduleConfig: IModuleConfig,
  request: TRequest<R>,
  options?: IOptions<R>
) => IUseHttpReturnType<R>;

const useHttp: TUseHttp = (moduleConfig, request, options) => {
  // @ts-ignore
  const router: NextRouter = useRouter();
  const { dispatch: uiDispatch } = useContext(UiContext);
  // translation requests
  const tr = useTranslations(`${moduleConfig.name}.Requests`);
  // translation errors
  const te = useTranslations(`${moduleConfig.name}.Errors`);

  const [response, setResponse] = useState<null | IResponse<any>>(null);
  const [error, setError] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);

  const handle = async (...args: any) => {
    try {
      setLoading(true);
      setError(null);

      const result = await request(api(), ...args);

      console.log({ result });
      setResponse(result.data);

      if (options?.onSuccess) {
        options.onSuccess(result.data, {
          router,
          uiDispatch,
          tr,
        });
      }

      return result;
    } catch (err: any) {
      console.log({ err });

      setError(err);
      if (options?.onError) {
        options.onError(err);
      }

      let errorMessage: string;
      switch (true) {
        case err instanceof AxiosError: {
          errorMessage = err.response?.data.message;
          break;
        }
        case err instanceof AuthTokenExpiredError: {
          errorMessage = te("auth_token_expired");
          break;
        }
        case err instanceof Error: {
          errorMessage = err.message;
          break;
        }
        default: {
          errorMessage = "ارور ناشناخته";
        }
      }
      uiDispatch({
        type: SET_SNACKBAR,
        payload: {
          type: "error",
          message: errorMessage,
        },
      });
      if (err instanceof AuthTokenExpiredError) {
        router.replace(process.env.NEXT_PUBLIC_GUEST_REDIRECT_URL as string);
      }
    } finally {
      setLoading(false);
      if (options?.onFinal) {
        options.onFinal();
      }
    }
  };

  return {
    response,
    error,
    loading,
    handle,
  };
};

export default useHttp;
