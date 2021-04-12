const MAX_HEIGHT = 350;

function sumItems(items, callback) {
    return items.reduce(callback, 0);
}

export function isRowFull(row, screenWidth) {
    return sumItems(row, (sum, {rowWidth}) => sum + rowWidth) >= screenWidth;
}

export function createRows(images, screenWidth) {
    console.log('append', screenWidth, images);
    let i = 0,
        allHeights = [],
        rows = [];

    while (i < images.length) {
        let rowHeight;
        let rowImages = [];
        do {
            rowImages.push(images[i]);
            rowHeight = screenWidth / sumItems(rowImages, (sum, img) => sum + img.width / img.height);
            i++;
        } while (i < images.length && (rowHeight > MAX_HEIGHT));

        if (rowHeight > MAX_HEIGHT) {
            // last row
            rowHeight = allHeights.length ?
                allHeights.reduce((sum, h) => sum + h, 0) / allHeights.length
                : MAX_HEIGHT;
        } else {
            allHeights.push(rowHeight);
        }

        rows.push(rowImages.map(img => {
            img.rowWidth = img.width / img.height * rowHeight;
            img.rowHeight = rowHeight;
            return img;
        }));
    }

    return rows;
}