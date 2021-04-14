import React, { useContext, useState } from 'react';
import { ACTIONS_TYPES } from '../../store/actions';
import { ImagesContext } from '../../store/ImagesStore';
import { getImageProperties } from '../../helpers/parseHelper';

import './inputURL.less';

export default function InputURL() {
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

    return (
        <div className="input-url">
            <label className="input-url__label">
                Enter image url:
                <input 
                    className="input-url__input"
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </label>

            <p className="input-url__error">{error}</p>
        </div>
    )
}