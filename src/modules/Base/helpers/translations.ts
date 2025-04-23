// [IMPORT MODULE CONFIGS]
import userModuleConfig from "@/modules/User/module.config";
import baseModuleConfig from "../module.config";
import authModuleConfig from "@/modules/Auth/module.config";
import dashboardModuleConfig from "@/modules/Dashboard/module.config";
import exchangeModuleConfig from "@/modules/Exchange/module.config";
import coinModuleConfig from "@/modules/Coin/module.config";
import settingModuleConfig from "@/modules/Setting/module.config";
// [END IMPORT MODULE CONFIGS]

const translations = async (locale: string) => {
  return {
    // [TRANSLATION ENTRIES]
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
    [exchangeModuleConfig.name]: (await import(`../../Exchange/${locale}.json`))
      .default,
    [coinModuleConfig.name]: (await import(`../../Coin/${locale}.json`))
      .default,
    [settingModuleConfig.name]: (
      await import(`../../Setting/messages/${locale}.json`)
    ).default,
        [settingModuleConfig.name]: (await import(`../../Setting/messages/${locale}.json`)).default,
// [END TRANSLATION ENTRIES]
  };
};

export default translations;
