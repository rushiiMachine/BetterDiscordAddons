// TODO: export properly without globals

/* Imports */
import * as kuromojiLib from 'kuromoji';
import * as wanakana from 'wanakana';
import CustomModules from '../../common/CustomModules';
import { buildPlugin } from '../../common/BuildPlugin';
import Utilities from '../../common/Utilities';
import config from './config.json';

/* Typings imports */
import { UnpatchCallback } from '../../common/ZLibrary/Patcher';

const Furigana = buildPlugin(config, (Plugin, Library) => {
  /* Libraries */
  const { Patcher, Logger, PluginUtilities, Toasts, DiscordModules } = Library;
  const { updateMessages } = Utilities(Library);

  /* Discord webpack modules */
  const { AstParser } = CustomModules(Library);
  const { React } = DiscordModules;

  /* Static data */
  const kanjiRegex = /[\u4E00-\u9FAF\u3040-\u3096\u30A1-\u30FA\uFF66-\uFF9D\u31F0-\u31FF]/;
  const kuromojiDictUrl = 'https://raw.githubusercontent.com/takuyaa/kuromoji.js/master/dict/';

  /* Plugin class */
  return class Furigana extends Plugin {
    kuromoji?: kuromojiLib.Tokenizer<kuromojiLib.IpadicFeatures>;
    patches: UnpatchCallback[];

    constructor() {
      super();
      this.patches = [];
    }

    /* Mandatory methods */
    onStart() {
      // If Discord is taking more than 1.7gb, then reload Discord
      // This is required due to a memory leak in kuromoji
      if (process.memoryUsage().rss > 1.7e9) return window.location.reload();

      this.reinjectCSS();

      // Inject furigana when rendering messages
      this.patches.push(Patcher.after(AstParser, 'parse', (_, _args, returnVal) => this.inject(returnVal)));

      const loadStartTime = Date.now();

      kuromojiLib
        .builder({
          dicPath: kuromojiDictUrl
        })
        .build((err, analyzer) => {
          if (err) {
            Logger.err('Failed to load kuromoji: ' + err);
            Toasts.error('Furigana: Failed to load dictionaries');
          } else {
            this.kuromoji = analyzer;

            Logger.info(`Loaded dictionaries in ${Date.now() - loadStartTime}ms`);
            updateMessages();
          }
        });
    }

    onStop() {
      // Remove injection hook
      Patcher.unpatchAll(this.patches);

      // Rerender messages without injecting
      updateMessages();
    }

    getSettingsPanel() {
      const panel = this.buildSettingsPanel().getElement();

      // TODO: Find a better event, and update messages bc of possible useKatakana change
      panel.onclick = () => {
        const newSize = Math.round(this.settings.furiganaSize as number);
        if (newSize !== this.settings.furiganaSize) {
          this.settings.furiganaSize = newSize;
          this.reinjectCSS();
        }
      };

      return panel;
    }

    /* Methods */
    reinjectCSS() {
      const furiganaSize = this.settings.furiganaSize;
      const css = `.furigana { font-size: ${furiganaSize}%; font-weight: normal; font-style: normal;}`;
      PluginUtilities.removeStyle(config.info.name);
      PluginUtilities.addStyle(config.info.name, css);
    }

    inject(res) {
      // Kuromoji has not yet initialized. It will rerender once it does
      if (!this.kuromoji) return res;

      const rendered: any[] = [];

      for (const el of res) {
        if (typeof el !== 'string') {
          if (['u', 'em', 'strong'].includes(el.type)) {
            el.props.children = this.inject(el.props.children);
          }

          if (el.type.name === 'StringPart') {
            el.props.parts = this.inject(el.props.parts);
          }

          rendered.push(el);
          continue;
        }

        if (!kanjiRegex.test(el)) {
          rendered.push(el);
          continue;
        }

        const tokens = wanakana.tokenize(el, { detailed: true }) as unknown as {
          value: string;
          type: string;
        }[];
        for (const token of tokens) {
          if (token.type !== 'kanji') {
            rendered.push(token.value);
            continue;
          }

          for (const token2 of this.kuromoji.tokenize(token.value)) {
            const { pronunciation, surface_form } = token2;

            rendered.push(
              pronunciation ? (
                <ruby>
                  {surface_form}
                  <rt className="furigana">{this.settings.useKatakana ? pronunciation : wanakana.toHiragana(pronunciation)}</rt>
                </ruby>
              ) : (
                token2.surface_form
              )
            );
          }
        }
      }

      return rendered;
    }
  };
});

Object.assign(global, { Furigana });
