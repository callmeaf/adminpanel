// [IMPORT MODULE CONFIGS]
import userModuleConfig from "@/modules/User/module.config";
import baseModuleConfig from "../module.config";
import authModuleConfig from "@/modules/Auth/module.config";
import dashboardModuleConfig from "@/modules/Dashboard/module.config";
import exchangeModuleConfig from "@/modules/Exchange/module.config";
import coinModuleConfig from "@/modules/Coin/module.config";
import settingModuleConfig from "@/modules/Setting/module.config";
import accountModuleConfig from "@/modules/Account/module.config";
import strategyModuleConfig from "@/modules/Strategy/module.config";
import accountStrategyModuleConfig from "@/modules/AccountStrategy/module.config";
import accountStrategyCoinModuleConfig from "@/modules/AccountStrategyCoin/module.config";
// [END IMPORT MODULE CONFIGS]

const translations = async (locale: string) => {
  try {
    return {
      // [TRANSLATION ENTRIES]
      [baseModuleConfig.name]: (
        await import(`@/modules/Base/messages/${locale}.json`)
      ).default,
      [userModuleConfig.name]: (
        await import(`@/modules/User/messages/${locale}.json`)
      ).default,
      [authModuleConfig.name]: (
        await import(`@/modules/Auth/messages/${locale}.json`)
      ).default,
      [dashboardModuleConfig.name]: (
        await import(`@/modules/Dashboard/messages/${locale}.json`)
      ).default,
      [exchangeModuleConfig.name]: (
        await import(`@/modules/Exchange/messages/${locale}.json`)
      ).default,
      [coinModuleConfig.name]: (
        await import(`@/modules/Coin/messages/${locale}.json`)
      ).default,
      [settingModuleConfig.name]: (
        await import(`@/modules/Setting/messages/${locale}.json`)
      ).default,
      [accountModuleConfig.name]: (
        await import(`@/modules/Account/messages/${locale}.json`)
      ).default,
      [strategyModuleConfig.name]: (
        await import(`@/modules/Strategy/messages/${locale}.json`)
      ).default,
          [accountStrategyModuleConfig.name]: (await import(`../../AccountStrategy/messages/${locale}.json`)).default,
    [accountStrategyCoinModuleConfig.name]: (await import(`../../AccountStrategyCoin/messages/${locale}.json`)).default,
// [END TRANSLATION ENTRIES]
    };
  } catch (error) {
    console.error(`Error loading translations for locale "${locale}":`, error);
    throw new Error(`Failed to load translations for locale "${locale}"`);
  }
};

export default translations;
