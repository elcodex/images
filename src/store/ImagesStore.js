import { useEffect, createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ACTIONS } from './actions';

export const ImagesContext = createContext();

export function ImagesContextProvider({ containerId, children }) {
    const container = document.getElementById(containerId);
    const [state, updateState] = useReducer(dispatch, {
        images: [],
        screenWidth: container.clientWidth
    });

    function handleResize() {
        const width = Number(container.clientWidth);
        updateState({type: 'update', payload: width});
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        }
    }, []);

    return (
        <ImagesContext.Provider value={{state, updateState}}>
            {children}
        </ImagesContext.Provider>
    )
}

ImagesContextProvider.propTypes = {
    containerId: PropTypes.string.isRequired,
    children: PropTypes.node
}

function dispatch(state, action) {
    if (action.type in ACTIONS) {
        return ACTIONS[action.type](state, action.payload);
    }
    return state;
}