import React from 'react';
import { DropFiles, ImagesCollection } from '../index';

export default function Gallery() {
    return (
        <DropFiles>
            <ImagesCollection />
        </DropFiles>
    );
}