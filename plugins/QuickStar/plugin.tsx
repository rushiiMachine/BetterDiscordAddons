// TODO: export properly without globals

/* Imports */
import CustomModules from '../../common/CustomModules';
import { buildPlugin } from '../../common/BuildPlugin';
import config from './config.json';

/* Typings imports */
import { UnpatchCallback } from '../../common/ZLibrary/Patcher';

const QuickStar = buildPlugin(config, (Plugin, Library) => {
  /* Libraries */
  const { Patcher, DiscordModules, WebpackModules } = Library;

  /* Discord webpack modules */
  const { React } = DiscordModules;
  const { ReactionUtils, PermissionUtils, Permissions } = CustomModules(Library);
  const Menu = WebpackModules.getByProps('MenuItem');

  /* Plugin class */
  return class QuickStar extends Plugin {
    patches: UnpatchCallback[];

    constructor() {
      super();
      this.patches = [];
    }

    /* Mandatory methods */
    async onStart() {
      const MessageContextMenu = await Library.DCM.getDiscordMenu('MessageContextMenu');

      this.patches.push(
        Patcher.after(MessageContextMenu, 'default', (_, args, returnVal) => {
          const { channel, message } = args[0];
          const { id: message_id, channel_id } = message;
          if (!PermissionUtils.can(Permissions.ADD_REACTIONS, channel)) return;

          const tree = returnVal.props.children[2].props.children;
          tree.splice(
            7,
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
