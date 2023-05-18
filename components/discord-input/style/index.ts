import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import type { FullToken } from '../../theme/util/genComponentStyleHook';

export interface ComponentToken {}

type DiscordInputToken = FullToken<'DiscordInput'> & {};

export const genBaseStyle: GenerateStyle<DiscordInputToken> = (
  token: DiscordInputToken,
): CSSObject => {
  const { componentCls } = token;
  return {
    [`${componentCls}`]: {
      backgroundColor: '#e1c1c1',
    },
    [`ant-discord-input-option-key`]: {
      backgroundColor: '#ad1919',
    },
    [`ant-discord-input-option-value`]: {
      backgroundColor: '#0b48e7',
    },
    'ant-discord-input': {
      backgroundColor: '#e1c1c1',
    },
    'ant-discord-input-application-command-option-value': {
      backgroundColor: '#2f3136',
      '&::after': {
        flex: 1,
        paddingLeft: 4,
        paddingTop: 4,
        whitespace: 'nowrap',
        color: '#fff',
        pointerEvents: 'none',
        userSelect: 'none',
        content: 'attr(data-trailing-placeholder)',
      },
    },
  };
};

export default genComponentStyleHook(
  'DiscordInput',
  (token) => {
    const discordInputToken = mergeToken<DiscordInputToken>(token, {});
    return [genBaseStyle(discordInputToken)];
  },
  {},
);
