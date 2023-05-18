import React from 'react';
import type { Node as slateNode } from 'slate';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

interface ApplicationCommandProps {
  attributes: any;
  element: slateNode;
  children: React.ReactNode;
}

function ApplicationCommand(props: ApplicationCommandProps) {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('discord-input');
  const [wrapSSR] = useStyle(prefixCls);

  return wrapSSR(
    <div
      className={`${prefixCls}-application-command-option-value`}
      data-trailing-placeholder={props.attributes.placeholder}
      {...props.attributes}
    >
      {props.children}
    </div>,
  );
}

export default ApplicationCommand;
