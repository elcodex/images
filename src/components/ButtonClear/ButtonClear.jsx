import React, { useContext } from 'react';
import { ImagesContext } from '../../store/ImagesStore';
import { ACTIONS_TYPES } from '../../store/actions';

import './buttonClear.less';

export default function ClearButton() {
    const { updateState } = useContext(ImagesContext);

    function handleClick(event) {
        event.stopPropagation();
        
        if (window.confirm('Clear collection?')) {
            updateState({type: ACTIONS_TYPES.CLEAR});
        }
    }
    return (
        <div>
            <button className="settings__button-clear button control" onClick={handleClick}>
                Clear
            </button>
        </div>
    )
}