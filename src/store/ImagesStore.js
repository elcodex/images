import React from 'react';
import PropTypes from 'prop-types';
import { ACTIONS } from './actions';

const initialState = {
    images: [],
    width: 800
}

export const ImagesContext = React.createContext();

export function ImagesContextProvider({ children }) {
    const [state, updateState] = React.useReducer(dispatch, initialState);
    
    console.log(state);

    return (
        <ImagesContext.Provider value={{state, updateState}}>
            {children}
        </ImagesContext.Provider>
    )
}

ImagesContextProvider.propTypes = {
    children: PropTypes.node
}

function dispatch(state, action) {
    if (action.type in ACTIONS) {
        return ACTIONS[action.type](state, action.payload);
    }
    return state;
}