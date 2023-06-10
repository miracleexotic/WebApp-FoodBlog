import EditorTheme from "./themes/Theme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ImageNode } from "./nodes/ImageNode";
import ReadOnlyContentEditable from "./plugins/ReadOnlyContentEditablePlugin";
import EditorStatePlugin from "./plugins/EditorStatePlugin";

import "./styles/ViewerToolbar.css";
import React from "react";

function Viewer(props: any) {

  const editorConfig = {
    namespace: "Viewer",
    // The editor theme
    theme: EditorTheme,
    // Handling of errors during update
    onError(error: any) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      ImageNode
    ],
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ReadOnlyContentEditable className="editor-input" />}
            placeholder={<div></div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <EditorStatePlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}

export default Viewer;
