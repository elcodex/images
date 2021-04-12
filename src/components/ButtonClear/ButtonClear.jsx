import React, { useContext } from 'react';
import { ImagesContext } from '../../store/ImagesStore';
import { ACTIONS_TYPES } from '../../store/actions';

import './buttonClear.less';

export default function ClearButton() {
    const { updateState } = useContext(ImagesContext);

    function handleClick() {
        if (window.confirm('Clear collection?')) {
            updateState({type: ACTIONS_TYPES.CLEAR});
        }
    }
    return (
        <div>
            <button className="button button-clear" onClick={handleClick}>
                Clear
            </button>
        </div>
    )
}