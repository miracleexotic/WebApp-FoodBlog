import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useCallback } from 'react';

export default function ReadOnlyContentEditable(props) {
    const [editor] = useLexicalComposerContext();
    const ref = useCallback(
        (rootElement) => {
            editor.setRootElement(rootElement);
        },
        [editor]
    );

    return (
        <div
            contentEditable={false}
            id={props.id}
            ref={ref}
        />
    );
}