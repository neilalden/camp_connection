import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { ArgFunction, SetStateType } from "@/types";
type Props = {
    data: any;
    setData: SetStateType<any> | ArgFunction
}
const Editor = (props: Props) => {
    const [loaded, setLoaded] = useState(false);
    const { data, setData } = props

    useEffect(() => {
        setLoaded(true);
    }, []); // run on mounting
    console.log(data)
    if (!loaded) return <h2> Editor is loading </h2>;
    const toolBarRef = React.createRef<HTMLDivElement>();
    return <div>
        <div ref={toolBarRef} />
        <CKEditor
            // @ts-ignore
            editor={ClassicEditor}
            data={data}
            onReady={(editor: any) => {
                if (toolBarRef.current) toolBarRef.current.appendChild(editor.ui.view.toolbar.element);
            }}
            onChange={(event: any, editor: any) => {
                // onChange && onChange({
                //     target: { value: editor.getData() }
                // } as ChangeEvent<HTMLInputElement>)
                setData(editor.getData())
            }}
        />
    </div>
}

export default Editor;