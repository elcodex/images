import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ImagesContext } from '../../store/ImagesStore';
import { ACTIONS_TYPES } from '../../store/actions';
import { getImages } from '../../helpers/parseHelper';

import './dropFiles.less';

export default function DropFiles({ children }) {
    const { state, updateState } = useContext(ImagesContext);
    const [isDragEnter, setIsDragEnter] = useState(false);

    async function handleDropFiles(event) {
        event.stopPropagation();
        event.preventDefault();

        if (event.dataTransfer?.files) {
            const files = event.dataTransfer.files;
            try {
                const images = await getImages(files);
                updateState({type: ACTIONS_TYPES.APPEND, payload: images});
            } catch(error) {
                console.log(error.message);
            }
        }
        setIsDragEnter(false);
    }

    function handleDragEnter(event) {
        event.stopPropagation();
        event.preventDefault();

        if (event.dataTransfer?.files) {
            setIsDragEnter(true);
        }
    }

    function handleDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        
        if (event.dataTransfer?.files) {
            setIsDragEnter(true);
        }
    }

    function handleDragLeave() {
        setIsDragEnter(false);
    }

    function getClassNames() {
        let classNames = ['drop-files'];
        if (isDragEnter) {
            classNames.push('drop-files_drag');
        }
        if (state.images.length === 0) {
            classNames.push('drop-files_flex');
        }

        return classNames.join(' ');
    }

    return (
        <div className={getClassNames()}
            onDrop={handleDropFiles} 
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
        >
            {state.images.length === 0 && 
                <div className="drop-files__placeholder">
                    Drop files here
                </div>
            }

            {children}
        </div>
    );
}

DropFiles.propTypes = {
    children: PropTypes.node
}