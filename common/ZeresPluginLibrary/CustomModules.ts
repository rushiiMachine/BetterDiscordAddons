import { ZeresPluginLibrary } from './types';

export default function ({ WebpackModules }: ZeresPluginLibrary) {
  return {
    get LastChannelStore() {
      return WebpackModules.getByProps('getLastSelectedChannelId');
    },

    // idk if this is the actual name
    get AstParser() {
      return WebpackModules.getByProps('parse', 'parseTopic');
    },

    // get UserPopouts(): {
    //   UserPopoutInfo: any;
    //   UserPopoutCustomStatus: any;
    //   UserPopoutAvatar: any;
    //   UserPopoutProfileText: any;
    // } {
    //   return WebpackModules.getByProps('UserPopoutInfo');
    // },

    // get UserPopoutBody(): { default: any } {
    //   return WebpackModules.getModule(m => m.default.displayName === 'UserPopoutBody');
    // },

    // WebpackModules.getModule(m => m.default.displayName === 'CustomStatus')
    // WebpackModules.getModule(m => m.default.displayName === 'UserBio')
  };
}
