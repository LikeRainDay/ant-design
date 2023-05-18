import type { ReactNode } from 'react';
import React from 'react';
import type { Node as slateNode } from 'slate';

interface NormalProps {
  attributes: any;
  element: slateNode;
  children: ReactNode;
}

function Normal(props: NormalProps) {
  return <span {...props.attributes}> {props.children} </span>;
}

export default Normal;
