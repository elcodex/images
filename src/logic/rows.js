export const MAX_HEIGHT = 350;
export const GAP = 20;

export function isRowFull(row, screenWidth) {
    return row.reduce((sum, {rowWidth}) => sum + rowWidth, 0) >= screenWidth - (GAP * row.length);
}

export function createRows(images, screenWidth) {
    let i = 0,
        allHeights = [],
        rows = [];

    while (i < images.length) {
        let rowHeight;
        let rowImages = [];
        let minHeight;
        do {
            rowImages.push(images[i]);
            const widthsSum = rowImages.reduce((sum, img) => sum + img.width / img.height, 0);
            const gaps = GAP * rowImages.length;
            rowHeight = (screenWidth - gaps) / widthsSum;
            minHeight = Math.min(...rowImages.map(({height}) => height));
            i++;
        } while (i < images.length && rowHeight > Math.min(minHeight, MAX_HEIGHT));

        if (rowHeight >  Math.min(MAX_HEIGHT, minHeight)) {
            // last row
            rowHeight = allHeights.length ?
                Math.min(allHeights.reduce((sum, h) => sum + h, 0) / allHeights.length, minHeight)
                :  Math.min(MAX_HEIGHT, minHeight);
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