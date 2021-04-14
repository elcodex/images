import React from 'react';
import { ImagesContextProvider } from './store/ImagesStore';
import { Gallery, LoadPanel } from './components';

export default function App() {
    return (
        <ImagesContextProvider containerId="container">
            <LoadPanel />
            <Gallery />
        </ImagesContextProvider>
    )
}