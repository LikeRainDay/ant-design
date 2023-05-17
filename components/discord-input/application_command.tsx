import React from 'react';
import type { Node as slateNode } from 'slate';

interface ApplicationCommandProps {
  attributes: any;
  element: slateNode;
  children: React.ReactNode;
}

function ApplicationCommand(props: ApplicationCommandProps) {
  return <div {...props.attributes}>{props.children}</div>;
}

export default ApplicationCommand;
