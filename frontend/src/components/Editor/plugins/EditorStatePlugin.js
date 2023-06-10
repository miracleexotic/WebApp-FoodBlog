import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function EditorStatePlugin() {
  
  const [editor] = useLexicalComposerContext();

  const initEditor = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

  function getPost() {
    const apiUrl = `${process.env.REACT_APP_BACKEND_API}/post/${localStorage.getItem('postID')}`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          editor.setEditorState(editor.parseEditorState(res.data.Subject || initEditor));
        }
      });
  }

  useEffect(() => {
    getPost()
  }, []);

  return null;
}