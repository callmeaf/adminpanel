import { notFound } from "next/navigation";
import moduleConfig, { IModuleConfig } from "../module.config";
import { useEffect } from "react";
import useHttp from "./use-http";
import { getEnums, getRevalidate } from "../requests/base-requests";

type TUsePage = (config: IModuleConfig) => void;

const usePage: TUsePage = (config) => {
  if (!config.enabled) {
    notFound();
  }

  const { handle: handleGetRevalidate } = useHttp(moduleConfig, getRevalidate);
  const { handle: handleGetEnums } = useHttp(moduleConfig, getEnums);
  useEffect(() => {
    handleGetEnums();
    handleGetRevalidate();
  }, []);
};

export default usePage;
