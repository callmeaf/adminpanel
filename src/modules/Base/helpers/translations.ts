import userModuleConfig from "@/modules/User/module.config";
import baseModuleConfig from "../module.config";
import authModuleConfig from "@/modules/Auth/module.config";
import dashboardModuleConfig from "@/modules/Dashboard/module.config";

const translations = async (locale: string) => {
  return {
    [baseModuleConfig.name]: (
      await import(`../../Base/messages/${locale}.json`)
    ).default,
    [userModuleConfig.name]: (
      await import(`../../User/messages/${locale}.json`)
    ).default,
    [authModuleConfig.name]: (await import(`../../Auth/${locale}.json`))
      .default,
    [dashboardModuleConfig.name]: (
      await import(`../../Dashboard/${locale}.json`)
    ).default,
  };
};

export default translations;
