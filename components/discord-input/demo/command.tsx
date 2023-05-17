import { Button } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { createEditor, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const CodeElement = (props: any) => <Button {...props.attributes}>{props.children}</Button>;

const DefaultElement = (props: any) => <p {...props.attributes}>{props.children}</p>;
interface CodeNode {
  type: 'code';
  children: { text: string }[];
}
const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback((props: any): JSX.Element => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === '`') {
            event.preventDefault();
            Transforms.setNodes<CodeNode>(editor, { type: 'code', children: [{ text: '11' }] });
          }
        }}
      />
    </Slate>
  );
};

export default App;
