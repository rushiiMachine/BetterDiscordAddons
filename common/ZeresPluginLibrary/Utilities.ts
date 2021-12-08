import { ZeresPluginLibrary } from './types';

export default function ({ WebpackModules, ReactTools, Patcher }: ZeresPluginLibrary): {
  forceUpdate(...instances: any[]): void;
  updateMessages(): void;
} {
  const instanceKey = Object.keys(document.querySelector("[class^='app-']") || {}).some(n => n.startsWith('__reactInternalInstance')) ? '_reactInternalFiber' : '_reactInternals';
  const messageWrapperClass = '.' + WebpackModules.getByProps('messages', 'messagesWrapper').messagesWrapper;

  return {
    // credit: https://github.com/mwittrien/BetterDiscordAddons/blob/350a8ec5d8deb9885b2cfce130e38e7581b7fd15/Library/0BDFDB.plugin.js#L2844
    forceUpdate(...instances) {
      for (const ins of instances.flat(10).filter(n => n)) if (ins.updater && typeof ins.updater.isMounted == 'function' && ins.updater.isMounted(ins)) ins.forceUpdate();
    },

    // credit: https://github.com/mwittrien/BetterDiscordAddons/blob/350a8ec5d8deb9885b2cfce130e38e7581b7fd15/Library/0BDFDB.plugin.js#L2871
    updateMessages() {
      const LayerProviderIns = ReactTools.getOwnerInstance(document.querySelector(messageWrapperClass) as HTMLElement);
      const LayerProviderPrototype = LayerProviderIns ? LayerProviderIns[instanceKey].type.prototype : undefined;

      if (LayerProviderIns && LayerProviderPrototype) {
        const unpatch = Patcher.after(LayerProviderPrototype, 'render', (_, _args, returnValue) => {
          returnValue.props.children = typeof returnValue.props.children === 'function' ? () => null : [];
          this.forceUpdate(LayerProviderIns);
          unpatch();
        });

        this.forceUpdate(LayerProviderIns);
      }
    }
  };
}
