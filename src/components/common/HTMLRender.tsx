'use client';

import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

export function HTMLRender({ htmlContent }: { htmlContent: string }) {
    return <FroalaEditorView model={htmlContent} />;
}
