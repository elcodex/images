import React, { useContext, useState } from 'react';
import { ImagesContext } from '../../store/ImagesStore';
import { ACTIONS_TYPES } from '../../store/actions';
import { ButtonClear } from '../index';

import './imagesCollection.less';


export default function ImagesCollection() {
    const { state, updateState } = useContext(ImagesContext);
    const [ removeMode, setRemoveMode ] = useState(false);

    function handleClick(event) {
        if (event.target instanceof HTMLButtonElement) {
            event.stopPropagation();

            if (window.confirm('Delete selected image?')) {
                const payload = {
                    row: Number(event.target.dataset.row),
                    column: Number(event.target.dataset.column)
                }
                updateState({type: ACTIONS_TYPES.REMOVE, payload});
            }
        }
    }

    function handleChange(event) {
        setRemoveMode(event.currentTarget.checked);
    }

    if (!state.images.length) {
        return null;
    }

    return (
        <div className="images" onClick={handleClick}>
            <div className="images__settings">
                <label className="settings__remove-mode">
                    <input 
                        className="remove-mode__checkbox"
                        type="checkbox" onChange={handleChange}
                        checked={removeMode}
                    />
                    Remove mode
                </label>
                <ButtonClear />
            </div>

            {state.images.map((row, i) =>
                <div className="images__row" key={`row-${i}`}>
                    {row.map(({url, rowWidth, rowHeight}, j) =>
                        <figure 
                            className="images__container"
                            style={{width: rowWidth, height: rowHeight}}
                            key={`image-${j}`}
                        >
                            <img className="container__image" src={url} alt="" loading="lazy" />
                            <button 
                                className={`container__button-remove button control${!removeMode ? " button_hidden" : ""}`}
                                data-row={i}
                                data-column={j}
                            >
                                x
                            </button>
                        </figure>
                    )}
                </div>
            )}
        </div>
    )
}