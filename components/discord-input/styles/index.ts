import { CSSObject } from '@ant-design/cssinjs';
import { resetComponent } from 'antd/es/style';
import { genComponentStyleHook, GenerateStyle, mergeToken } from 'antd/es/theme/internal';
import { FullToken } from 'antd/es/theme/util/genComponentStyleHook';

export interface ComponentToken {}

type DiscordInputToken = FullToken<'DiscordInput'> & {};

export const genBaseStyle: GenerateStyle<DiscordInputToken> = (
  token: DiscordInputToken,
): CSSObject => {
  const {
    componentCls,
    motionDurationSlow: duration,
    marginXS,
    marginSM,
    fontSize,
    fontSizeLG,
    lineHeight,
    borderRadiusLG: borderRadius,
    motionEaseInOutCirc,
    colorText,
    paddingMD,
    paddingContentHorizontalLG,
  } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      // padding: `${paddingContentVerticalSM}px ${alertPaddingHorizontal}px`, // Fixed horizontal padding here.
      wordWrap: 'break-word',
      borderRadius,

      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
      },

      [`${componentCls}-content`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${componentCls}-icon`]: {
        marginInlineEnd: marginXS,
        lineHeight: 0,
      },

      [`&-description`]: {
        display: 'none',
        fontSize,
        lineHeight,
      },

      '&-message': {
        color: colorText,
      },

      [`&${componentCls}-motion-leave`]: {
        overflow: 'hidden',
        opacity: 1,
        transition: `max-height ${duration} ${motionEaseInOutCirc}, opacity ${duration} ${motionEaseInOutCirc},
        padding-top ${duration} ${motionEaseInOutCirc}, padding-bottom ${duration} ${motionEaseInOutCirc},
        margin-bottom ${duration} ${motionEaseInOutCirc}`,
      },

      [`&${componentCls}-motion-leave-active`]: {
        maxHeight: 0,
        marginBottom: '0 !important',
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0,
      },
    },

    [`${componentCls}-with-description`]: {
      alignItems: 'flex-start',
      paddingInline: paddingContentHorizontalLG,
      paddingBlock: paddingMD,

      [`${componentCls}-icon`]: {
        marginInlineEnd: marginSM,
        // fontSize: alertIconSizeLG,
        lineHeight: 0,
      },

      [`${componentCls}-message`]: {
        display: 'block',
        marginBottom: marginXS,
        color: colorText,
        fontSize: fontSizeLG,
      },

      [`${componentCls}-description`]: {
        display: 'block',
      },
    },

    [`${componentCls}-banner`]: {
      marginBottom: 0,
      border: '0 !important',
      borderRadius: 0,
    },
  };
};

export default genComponentStyleHook(
  'DiscordInput',
  (token) => {
    const discordInputToken = mergeToken<DiscordInputToken>(token, {});
    return [genBaseStyle(discordInputToken)];
  },
  {
    sizePaddingEdgeHorizontal: 0,
  },
);
