import React, { useRef } from 'react';
import FileInput from '../FileInput/FileInput';

import './buttonAddFiles.less';

export default function SelectFilesButton() {
    const fileInputRef = useRef(null);
    
    function handleButtonClick() {
        fileInputRef?.current?.click();
    }
    
    return (
        <div>
            <FileInput ref={fileInputRef}/>
            <button className="button button-add" onClick={handleButtonClick}>
                Add files
            </button>
        </div>
    )
}