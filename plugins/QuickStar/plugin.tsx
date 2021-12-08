// TODO: export properly without globals

/* Imports */
import CustomModules from '../../common/ZeresPluginLibrary/CustomModules';
import libCheck from '../../common/ZeresPluginLibrary/0PluginLibCheck';
import config from './config.json';

/* Typings imports */
import { UnpatchCallback } from '../../common/ZeresPluginLibrary/types/Patcher';

const QuickStar = libCheck(config, (Plugin, Library) => {
  /* Libraries */
  const { Patcher, DiscordModules, WebpackModules } = Library;

  /* Discord webpack modules */
  const { React } = DiscordModules;
  const { MessageContextMenu, ReactionUtils, PermissionUtils, Permissions } = CustomModules(Library);
  const Menu = WebpackModules.getByProps('MenuItem');

  /* Plugin class */
  return class QuickStar extends Plugin {
    patches: UnpatchCallback[];

    constructor() {
      super();
      this.patches = [];
    }

    /* Mandatory methods */
    onStart() {
      this.patches.push(
        Patcher.after(MessageContextMenu, 'default', (_, args, returnVal) => {
          console.log(args);
          const { id: message_id, channel_id } = args[0].message;
          const { channel } = args[0];
          if (!PermissionUtils.can(Permissions.ADD_REACTIONS, channel)) return;

          const tree = returnVal.props.children[2].props.children;
          tree.splice(
            9,
            0,
            <Menu.MenuItem
              id="quick-star"
              label="Quick Star"
              action={() => {
                ReactionUtils.addReaction(channel_id, message_id, { id: null, name: '⭐', animated: false });
              }}
            />
          );
        })
      );
    }

    onStop() {
      Patcher.unpatchAll(this.patches);
    }
  };
});

Object.assign(global, { QuickStar });
