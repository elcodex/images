import React from 'react';
import { ImagesContextProvider } from './store/ImagesStore';
import { Gallery, UploadPanel } from './components';

export default function App() {
    return (
        <ImagesContextProvider containerId="container">
            <UploadPanel />
            <Gallery />
        </ImagesContextProvider>
    )
}