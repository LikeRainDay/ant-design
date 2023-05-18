import { Space } from 'antd';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createEditor, Transforms } from 'slate';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Editable, Slate, withReact } from 'slate-react';
import { ConfigContext } from '../config-provider';
import ApplicationCommand from './application_command';
import Normal from './normal';
import OptionElement from './option_element';
import useStyle from './style';

const initialValue = [
  {
    type: 'applicationCommand',
    attributes: {
      placeholder: '测试',
    },
    children: [
      { text: '/discord ' },
      {
        type: 'option',
        children: [{ text: 's324234', attributes: { name: 'prompt' } }],
      },
      { text: 'text3' },
    ],
  },
  {
    type: 'tag',
    children: [{ text: '22' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '33' }],
  },
];

function DiscordInput() {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('discord-input');
  const [wrapSSR] = useStyle(prefixCls);
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'applicationCommand':
        return <ApplicationCommand {...props} />;
      case 'option':
        return <OptionElement {...props} />;
      default:
        return <Normal {...props} />;
    }
  }, []);
  return wrapSSR(
    <Space
      className={`${prefixCls}`}
      // style={{
      //   maxHeight: '20vh',
      //   overflowY: 'scroll',
      //   width: '100%',
      //   overflowX: 'hidden',
      //   backgroundColor: '#36393f',
      //   borderRadius: '5px',
      // }}
    >
      <Slate editor={editor} value={initialValue}>
        <Editable
          style={{
            wordBreak: 'break-word',
            textAlign: 'left',
            whiteSpace: 'break-spaces',
          }}
          renderElement={renderElement}
          onKeyDown={(event) => {
            if (event.key === '&') {
              // 防止插入 `&` 字符。
              event.preventDefault();
              // 事件发生时执行 `insertText` 方法。
              Transforms.setNodes(editor, { type: 'tag', children: [] });
            }
          }}
        />
      </Slate>
    </Space>,
  );
}

export default DiscordInput;
