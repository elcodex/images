import React from 'react';
import { ButtonAddFiles, ButtonClear, InputURL } from '../index';

import './loadPanel.less';

export default function LoadPanel() {
    return (
        <div className="panel">
            <InputURL />
            <ul className="panel__navigation">
                <li className="navigation__item"><ButtonAddFiles /></li>
                <li className="navigation__item"><ButtonClear /></li>
            </ul>
        </div>
    )
}