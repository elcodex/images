import { MAX_HEIGHT, GAP, createRows } from '../../logic/rows';

function random(number) {
    return Math.floor(Math.random() * (number - 1)) + 1;
}

describe('Create rows', () => {
    test('Empty images', () => {
        expect(createRows([], 100)).toHaveLength(0);
    });

    test('One image', () => {
        expect(createRows([{url: 'url', width: 200, height: 500}], 500).flat(1)).toHaveLength(1);
    });

    test('Images order', () => {
        const images = [
            {url: 'url1', width: random(1000), height: 350 + random(1000)},
            {url: 'url2', width: random(1000), height: 350 + random(1000)},
            {url: 'url3', width: random(1000), height: 350 + random(1000)}
        ];
        const rows = createRows(images, 1000);
        expect(rows.flat(1).every(({url}, i) => url === images[i].url)).toBe(true);
    });

    test('Images row height are equal', () => {
        const images = []
        for (let i = 0; i < 50; i++) {
            images.push({url: 'url', width: random(1000), height: random(1000)});
        }

        createRows(images, 860)
            .forEach(row => row
                .forEach(({rowHeight}) => 
                    expect(rowHeight).toBe(row[0].rowHeight)
            )
        );
    });

    test('Images rows height are less than MAX_HEIGHT', () => {
        const images = []
        for (let i = 0; i < 50; i++) {
            images.push({url: 'url', width: random(1000), height: random(1000)});
        }

        createRows(images, 860)
            .forEach(row => row
                .forEach(({rowHeight}) => 
                    expect(rowHeight).toBeLessThanOrEqual(MAX_HEIGHT)
            )
        );
    });

    test('Every image row height is smaller than image height', () => {
        const images = []
        for (let i = 0; i < 50; i++) {
            images.push({url: 'url', width: random(300), height: random(300)});
        }

        createRows(images, 500)
            .forEach(row => row.forEach(({height, rowHeight}) => 
                expect(height).toBeGreaterThanOrEqual(rowHeight)
            )
        );
    });

    test('Image proportions stay unchanged', () => {
        const images = []
        for (let i = 0; i < 50; i++) {
            images.push({url: 'url', width: random(300), height: random(300)});
        }

        createRows(images, 500)
            .forEach(row => row.forEach(({width, height, rowWidth, rowHeight}) => 
                expect(Math.abs(width / height - rowWidth / rowHeight)).toBeLessThan(1e-6)
            )
        );
    });

    test('Images row count', () => {
        const images = [
            {url: 'url', width: 200 - GAP, height: MAX_HEIGHT - 10},
            {url: 'url', width: 100 - GAP, height: MAX_HEIGHT - 10},
            {url: 'url', width: 100 - GAP, height: MAX_HEIGHT - 10},
            {url: 'url', width: 200 - GAP, height: MAX_HEIGHT - 10}
        ]

        expect(createRows(images.slice(0, 1), 200)).toHaveLength(1);
        expect(createRows(images.slice(0, 2), 200)).toHaveLength(2);
        expect(createRows(images.slice(0, 3), 200)).toHaveLength(2);
        expect(createRows(images.slice(0, 4), 200)).toHaveLength(3);
    });
})