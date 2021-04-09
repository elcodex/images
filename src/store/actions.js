import { sumItems } from './helpers';

const MAX_HEIGHT = 350;

export const ACTIONS = {
    'append': appendImage,
    'update': updateImages
}

function appendImage(state, img) {
    console.log('state', state);
    console.log('img', img);
    const {url, width, height} = img;

    if (!state.images.length) {
        const rowHeight = MAX_HEIGHT;
        const rowWidth = width / height * MAX_HEIGHT;
        return {
            images: [
                [{url, width, height, rowWidth, rowHeight}]
            ],
            width: state.width
        }
    }

    let images = state.images.map(row => row.map(img => ({...img})));

    const isLastRowFull = 
        sumItems(images[images.length - 1], (sum, {rowWidth}) => sum + rowWidth) === state.width;
    
    if (isLastRowFull) {
        const rowHeight = sumItems(images, (sum, row) => sum + row[0].rowHeight) / images.length;
        const rowWidth = width / height * rowHeight;
        images.push([{url, width, height, rowWidth, rowHeight}]);
    } else {
        let rowHeight = state.width / sumItems(
            images[images.length - 1].concat({url, width, height}),
            (sum, img) => sum + img.width / img.height
        );
        
        if (rowHeight > MAX_HEIGHT) {
            rowHeight = images.length > 1 ?
                sumItems(
                    images.slice(0, images.length - 1),
                    (sum, row) => sum + row[0].rowHeight
                ) / (images.length - 1)
                : MAX_HEIGHT;
        }

        images[images.length - 1] = images[images.length - 1].map(img => {
            img.rowWidth = img.width / img.height * rowHeight;
            img.rowHeight = rowHeight;
            return img;
        });

        images[images.length - 1].push({
            url, width, height,
            rowWidth: width / height * rowHeight,
            rowHeight: rowHeight
        });
    }

    return {
        images,
        width: state.width
    }
}

function updateImages(state,  width) {
    if (width === state.width) {
        return { ...state }
    }

    let images = state.images.flat(1);

    let i = 0,
        height,
        allHeights = [],
        rows = [];

    while (i < images.length) {
        let rowImages = [];
        do {
            rowImages.push(images[i]);
            height = width / sumItems(rowImages, (sum, img) => sum + img.width / img.height);
            i++;
        } while (i < images.length && (height > MAX_HEIGHT));

        if (height > MAX_HEIGHT) {
            // last row
            height = allHeights.length ?
                allHeights.reduce((sum, h) => sum + h, 0) / allHeights.length
                : MAX_HEIGHT;
        } else {
            avgHeight.push(height);
        }

        rows.push(rowImages.map(img => {
            img.rowWidth = img.width / img.height * height;
            img.rowHeight = height;
            return img;
        }));
    }

    return {
        images: rows,
        width
    }
}