import { createRows, isRowFull } from '../helpers/actionsHelper';

export const ACTIONS_TYPES = {
    APPEND: 'append',
    UPDATE: 'update',
    CLEAR: 'clear'
}

export const ACTIONS = {
    [ACTIONS_TYPES.APPEND]: appendImages,
    [ACTIONS_TYPES.UPDATE]: updateScreenWidth,
    [ACTIONS_TYPES.CLEAR]: clearImages
}

function appendImages(state, newImages) {
    if (!state.images.length) {
        return {
            ...state,
            images: createRows(newImages, state.screenWidth)
        }
    }

    let images = state.images.map(row => row.map(img => ({...img})));

    if (isRowFull(images[images.length - 1], state.screenWidth)) {
        const newRows = createRows(newImages, state.screenWidth);
        images.push(...newRows);
    } else {
        const newRows = createRows([...images[images.length - 1], ...newImages], state.screenWidth);
        images = [...images.slice(0, -1), ...newRows];
    }

    return {
        ...state,
        images
    }
}

function updateScreenWidth(state, screenWidth) {
    if (screenWidth === state.screenWidth) {
        return { ...state }
    }

    return {
        images: createRows(state.images.flat(1), screenWidth),
        screenWidth
    }
}

function clearImages(state) {
    return {
        ...state,
        images: []
    }
}