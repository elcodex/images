import React, { useRef } from 'react';
import FileInput from '../FileInput/FileInput';

import './buttonUpload.less';

export default function SelectFilesButton() {
    const fileInputRef = useRef(null);
    
    function handleButtonClick() {
        fileInputRef?.current?.click();
    }
    
    return (
        <div>
            <FileInput ref={fileInputRef}/>
            <button className="input-control__button-upload button control" onClick={handleButtonClick}>
                Upload
            </button>
        </div>
    )
}