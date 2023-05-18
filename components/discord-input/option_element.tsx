import React from 'react';
import type { Node as slateNode } from 'slate';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

interface OptionElementProps {
  attributes: any;
  element: slateNode;
  children: React.ReactNode;
}

function OptionElement(props: OptionElementProps) {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('discord-input');
  const [wrapSSR] = useStyle(prefixCls);

  return wrapSSR(
    <>
      <span className={`${prefixCls}-option-key`}> {props.attributes.name}</span>
      <span className={`${prefixCls}-option-value`}>{props.children}</span>
    </>,
  );
}

export default OptionElement;
