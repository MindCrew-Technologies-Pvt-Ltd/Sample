/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react';
import { Watermark } from '@hirohe/react-watermark';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG"];

function UploadFile() {
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const imgElement = useRef(null);

    const handleChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ): Promise<any> => {

        const fileLoaded = URL.createObjectURL(event.target.files[0]);
        setFile(fileLoaded);
    };

    const onImgLoad = (i: { naturalHeight: any; naturalWidth: any; }) => {
        if (i.naturalHeight === 512 && i.naturalWidth === 512) {
        }
        else {
            alert("size must be 512 * 512")
            setFile(null);
            setShow(false);
            window.location.reload();
        }

    };

    const handleChangeDragDrop = (file: any) => {
        console.log("file:::::",file);
        const fileLoaded = URL.createObjectURL(file);

        setFile(fileLoaded);
      };

    return (
        <div>
            {/* <input
                type="file"
                onChange={handleChange}
                accept="image/jpg,.gif,.png" /> */}
                <div style={{marginLeft:"29%"}}>
                    <FileUploader  handleChange={handleChangeDragDrop} name="file" types={fileTypes} />
                    </div>
            <img src={file}
                 ref={imgElement}
                onLoad={() =>
                    onImgLoad(imgElement.current)}
                style={{
                    display: 'flex',
                    border: '2px solid',
                    maxWidth: '512px',
                    maxHeight: '512px',
                    marginLeft: "30%",
                    marginTop: 20
                }} />
            {!file ? '' :
                <button style={{ marginTop: 20, }} onClick={() => setShow(!show)}>generate</button>}
            {show ?
                <div className="App" style={{ marginLeft: "30%", marginTop: 30, height: 400, width: 520 }}>
                    <Watermark
                        wrapperStyle={{ left: 0 }}
                        text="This is a watermark"
                        textColor="#000000"
                        multiline={true}
                        rotate={-45}
                        textSize={20}>
                        <div>
                            <img src={file}
                                style={{
                                    display: 'flex',
                                    border: '2px solid',
                                    maxWidth: '512px',
                                    maxHeight: '512px',
                                }} />
                        </div>
                    </Watermark>
                </div>
                : ""}
        </div>
    );
}
export default UploadFile;
