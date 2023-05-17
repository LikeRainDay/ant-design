// TODO: 4.0 - codemod should help to change `filterOption` to support node props.
import * as React from 'react';
import {Space} from "antd";
// eslint-disable-next-line import/no-extraneous-dependencies
import {Editable, Slate, withReact} from "slate-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {createEditor} from "slate";
import {useMemo} from "react";

const initialValue = [
  {
    type: 'paragraph',
    children: [{text: 'A line of text in a paragraph.'}],
  },
]

function DiscordInput() {
  const editor = useMemo(() => withReact(createEditor()), [])

  return (<Space>
    <Slate editor={editor} value={initialValue}>
      <Editable
        onKeyDown={event => {
          if (event.key === '&') {
            // 防止插入 `&` 字符。
            event.preventDefault()
            // 事件发生时执行 `insertText` 方法。
            editor.insertText('and')
          }
        }}
      />
    </Slate>
  </Space>)
}

export default DiscordInput;
