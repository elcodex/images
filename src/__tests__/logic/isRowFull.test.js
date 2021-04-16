import { MAX_HEIGHT, GAP, isRowFull } from '../../logic/rows';

describe('function isRowFull', () => {
    test('Empty row', () => {
        expect(isRowFull([], 100)).toBe(false);
    });

    test('Row is not full', () => {
        const isFull = isRowFull([{url:'url', width: 300, height: 200, rowWidth: 50, rowHeight: 70}], 100);
        expect(isFull).toBe(false);
    });

    test('Row is full', () => {
        const isFull = isRowFull([
            {url:'url', width: 300, height: 200, rowWidth: 70, rowHeight: 70},
            {url:'url', width: 300, height: 200, rowWidth: 70, rowHeight: 70},
            {url:'url', width: 300, height: 200, rowWidth: 70, rowHeight: 70}
        ], 210 + GAP*3);
        expect(isFull).toBe(true);
    });

});