import React from 'react';
import { ImagesContextProvider } from './store/ImagesStore';
import { ButtonAddFiles, DropFiles, ImagesCollection, ButtonClear } from './components';

import './css/app.less';

export default function App() {
    return (
        <ImagesContextProvider containerId="container">
            <div className="buttons">
                <ButtonAddFiles />
                <ButtonClear />
            </div>
            <DropFiles>
                <ImagesCollection />
            </DropFiles>
        </ImagesContextProvider>
    )
}