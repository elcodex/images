import React, { useContext, useState } from 'react';
import { ACTIONS_TYPES } from '../../store/actions';
import { ImagesContext } from '../../store/ImagesStore';
import { getImageProperties } from '../../logic/imageParser';
import { ButtonUpload } from '../index';

import './uploadPanel.less';


export default function UploadPanel() {
    const { updateState } = useContext(ImagesContext);
    const [ url, setURL ] = useState('');
    const [ error, setError ] = useState('');

    function handleChange(event) {
        setError('');
        setURL(event.target.value);
    }

    async function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!url) {
                return;
            }
            try {
                const img = await getImageProperties({url});
                updateState({type: ACTIONS_TYPES.APPEND, payload: [img]});
            } catch (error) {
                setError('Could not add image');
            }
        }
    }

    async function handleClick() {
        if (!url) {
            return;
        }
        try {
            const img = await getImageProperties({url});
            updateState({type: ACTIONS_TYPES.APPEND, payload: [img]});
        } catch (error) {
            setError('Could not add image');
        }
    }

    return (
        <div className="upload-panel">
            <label className="upload-panel__label" htmlFor="url">
                Add image from URL:
            </label>
            <div className="upload-panel__input-control">
                <input 
                    className="input-control__input control"
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    id="url"
                />
                <button className="input-control__button-add button control" onClick={handleClick}>
                    Add
                </button>
                <ButtonUpload />
            </div>

            <p className="upload-panel__error">{error}</p>
        </div>
    )
}