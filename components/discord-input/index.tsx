import { Space } from 'antd';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Node as slateNode } from 'slate';
import { Transforms, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, useSlate, useSlateWithV, withReact } from 'slate-react';
import ApplicationCommand from './application_command';

const initialValue = [
  {
    type: 'applicationCommand',
    children: [
      { text: '11' },
      {
        type: 'tag',
        children: [{ text: '测试删除' }],
      },
      { text: '123123' },
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

interface TagElementProps {
  attributes: any;
  element: slateNode;
  children: React.ReactNode;
}

const TagElement = ({ attributes, element, children }: TagElementProps) => {
  const editor = useSlate();
  const reactEditor = useSlateWithV();
  const [preventDelete, setPreventDelete] = useState(true);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      setPreventDelete(false);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !preventDelete) {
      Transforms.removeNodes(editor, {
        at: ReactEditor.findPath(reactEditor.editor, element),
      });
    }
  };

  useEffect(() => {
    setPreventDelete(true);
  }, [editor.selection]);

  return (
    <span {...attributes} className="tag-wrapper" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      {children}
    </span>
  );
};

function DiscordInput() {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'tag':
        return <TagElement {...props} />;
      case 'applicationCommand':
        return <ApplicationCommand {...props} />;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);
  return (
    <Space
      style={{
        maxHeight: '20vh',
        overflowY: 'scroll',
        width: '100%',
        overflowX: 'hidden',
        backgroundColor: '#36393f',
        borderRadius: '5px',
      }}
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
    </Space>
  );
}

export default DiscordInput;
