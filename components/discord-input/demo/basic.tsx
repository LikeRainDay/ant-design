import React, {useMemo} from "react";
import {Editable, Slate, withReact} from "slate-react";
import {createEditor} from "slate";
import {Space} from "antd";

const initialValue = [
  {
    type: 'paragraph',
    children: [{text: 'A line of text in a paragraph.'}],
  },
]

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  return (
    <Space>
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
    </Space>
  )
}

export default App;
