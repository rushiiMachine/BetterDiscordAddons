import { ZeresPluginLibrary } from './ZLibrary';

export default function ({ WebpackModules }: ZeresPluginLibrary) {
  return {
    get LastSelectedChannelStore() {
      return WebpackModules.getByProps('getLastSelectedChannelId');
    },

    // verify name
    get AstParser() {
      return WebpackModules.getByProps('parse', 'parseTopic');
    },

    get MessageContextMenu() {
      return WebpackModules.find(m => m?.default?.displayName === 'MessageContextMenu');
    },

    get ReactionUtils() {
      return WebpackModules.getByProps('addReaction', 'removeReaction');
    },

    get PermissionUtils() {
      return WebpackModules.getByProps('getChannelPermissions', 'can');
    },

    get Permissions() {
      return WebpackModules.getByProps('Permissions', 'BLOG_DOMAIN', 'APP_URL_PREFIX').Permissions;
    }
  };
}
