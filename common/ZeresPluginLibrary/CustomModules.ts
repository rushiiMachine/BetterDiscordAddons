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

    get MessageContextMenu() {
      return WebpackModules.find(m => m?.default?.displayName === 'MessageContextMenu');
    },

    get ReactionUtils() {
      return WebpackModules.getByProps('addReaction', 'removeReaction');
    }
  };
}
