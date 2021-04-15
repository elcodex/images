const MAX_HEIGHT = 350;
const GAP = 20;

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
        do {
            rowImages.push(images[i]);
            const widthsSum = rowImages.reduce((sum, img) => sum + img.width / img.height, 0);
            const gaps = GAP * rowImages.length;
            rowHeight = (screenWidth - gaps) / widthsSum;
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