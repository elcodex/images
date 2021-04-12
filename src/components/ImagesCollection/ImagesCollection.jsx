import React, { useContext } from 'react';
import { ImagesContext } from '../../store/ImagesStore';

import './imagesCollection.less';

export default function ImagesCollection() {
    const { state } = useContext(ImagesContext);

    if (!state.images.length) {
        return null;
    }

    return (
        <div className="images">
            {state.images.map((row, i) =>
                <div className="images__row" key={`row-${i}`}>
                    {row.map(({url, rowWidth, rowHeight}, j) =>
                        <figure className="images__container" style={{width: rowWidth, height: rowHeight}} key={`image-${j}`}>
                            <img className="images__image" src={url} alt="" loading="lazy" />
                        </figure>
                    )}
                </div>
            )}
        </div>
    )
}