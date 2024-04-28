'use client';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/themes/dark.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

import dynamic from 'next/dynamic';
import { imageUpload } from '@/helpers/clients';
const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
    ssr: false,
});

export function MyEditor(props: any) {
    return (
        <>
            <FroalaEditor
                tag='textarea'
                config={{
                    placeholderText: 'Nhập nội dung bài viết của bạn...',
                    language: 'vi',
                    theme: 'dark',
                    events: {
                        'image.beforeUpload': function (images: any) {
                            imageUpload(images).then((data: any) => {
                                // @ts-ignore
                                this.image.insert(
                                    data[0].url,
                                    false,
                                    null,
                                    // @ts-ignore
                                    this.image.get()
                                );
                            });
                            return false;
                        },
                        'image.delete': function (src: any) {
                            // console.log(src);
                            // @ts-ignore
                            const publicId = src.split('/').pop();
                            // @ts-ignore
                            imageDelete(publicId);
                        },
                    },
                }}
                model={props.model}
                onModelChange={props.onModelChange}
            />
        </>
    );
}

export default MyEditor;
