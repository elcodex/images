import { ACTIONS_TYPES, ACTIONS } from '../../store/actions';

function random(number) {
    return Math.floor(Math.random() * (number - 1)) + 1;
}

describe('Clear images', () => {
    test('No images', () => {
        const state = ACTIONS[ACTIONS_TYPES.CLEAR]({images: [], screenWidth: 300});
        expect(state.images).toHaveLength(0);
        expect(state.screenWidth).toBe(300);
    });

    test('Many images', () => {
        const images = [
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
        ];
        const state = ACTIONS[ACTIONS_TYPES.CLEAR]({images, screenWidth: 300});
        expect(state.images).toHaveLength(0);
        expect(state.screenWidth).toBe(300);
    });
});

describe('Update screen width', () => {
    test('New value, no images', () => {
        const state = ACTIONS[ACTIONS_TYPES.UPDATE]({images: [], screenWidth: 200}, 300);
        expect(state.screenWidth).toBe(300); 
    });

    test('New value, many images', () => {
        const images = [
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
        ];
        const state = ACTIONS[ACTIONS_TYPES.UPDATE]({images, screenWidth: 200}, 300);
        expect(state.screenWidth).toBe(300); 
    });

    test('Rows are updated', () => {
        const images = [
            [{url: 'url1', width: 50, height: 200}, {url: 'url1', width: 150, height: 200}],
            [{url: 'url1', width: 100, height: 130}, {url: 'url1', width: 50, height: 150},{url: 'url1', width: 50, height: 150}],
            [{url: 'url1', width: 100, height: 300}, {url: 'url1', width: 100, height: 300}],
            [{url: 'url1', width: 100, height: 300}]
        ];
        const state = ACTIONS[ACTIONS_TYPES.UPDATE]({images, screenWidth: 240}, 360);
        expect(state.screenWidth).toBe(360);
        expect(state.images.flat(1).length).toBe(images.flat(1).length); 
    });
});

describe('Append images', () => {
    test('Append one image, no images yet', () => {
        const state = ACTIONS[ACTIONS_TYPES.APPEND]({images: [], screenWidth: 200}, [{url: "new", width: 100, height: 300}]);
        expect(state.images.length).toBe(1);
        expect(state.images.flat(1).length).toBe(1);
        expect(state.images[0][0].url).toBe('new');
    });
    
    test('Append one image to the end of images', () => {
        const images = [
            [{url: 'url1', width: 50, height: 200}, {url: 'url1', width: 150, height: 200}],
            [{url: 'url1', width: 100, height: 130}, {url: 'url1', width: 50, height: 150}, {url: 'url1', width: 50, height: 150}],
            [{url: 'url1', width: 100, height: 300}, {url: 'url1', width: 100, height: 300}],
            [{url: 'url1', width: 100, height: 300}]
        ];
        const state = ACTIONS[ACTIONS_TYPES.APPEND]({images, screenWidth: 200}, [{url: "new", width: 100, height: 300}]);
        expect(state.images.flat(1).length).toBe(images.flat(1).length + 1);
        expect(state.images[state.images.length-1][state.images[state.images.length-1].length-1].url).toBe('new');
    });

    test('Append image to the last existed row', () => {
        const images = [
            [{url: 'url1', width: 200, height: 200}],
            [{url: 'url1', width: 50, height: 200, rowWidth: 50, rowHeight: 200}]
        ];
        const state = ACTIONS[ACTIONS_TYPES.APPEND]({images, screenWidth: 220}, [{url: "new", width: 100, height: 300}]);
        expect(state.images.length).toBe(images.length);
        expect(state.images[state.images.length - 1].length).toBe(2);
        expect(state.images[1][1].url).toBe('new');
    });

    test('Append image to a new row', () => {
        const images = [
            [{url: 'url1', width: 200, height: 200}]
        ];
        const state = ACTIONS[ACTIONS_TYPES.APPEND]({images, screenWidth: 220}, [{url: "new", width: 100, height: 300}]);
        expect(state.images.length).toBe(images.length + 1);
        expect(state.images[1][0].url).toBe('new');
    });

    test('Append many images', () => {
        const images = [
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
        ];        

        const newImages = [];
        for (let i = 0; i < random(10); i++) {
            newImages.push({url: 'url', width: random(300), height: random(300)});
        }
        const state = ACTIONS[ACTIONS_TYPES.APPEND]({images, screenWidth: 300}, newImages);

        expect(state.images.flat(1).length).toBe(images.flat(1).length + newImages.flat(1).length);
    });
});

describe('Remove image', () => {
    test('Remove image from images.length === 1', () => {
        const images = [[{url:"remove", width: 100, height: 100}]];
        const state = ACTIONS[ACTIONS_TYPES.REMOVE]({images, screenWidth: 200}, {row: 0, column: 0});

        expect(state.images.length).toBe(0);
    });

    test('Remove nothing from images.length === 1', () => {
        const images = [[{url:"notRemove", width: 100, height: 100}]];
        const state = ACTIONS[ACTIONS_TYPES.REMOVE]({images, screenWidth: 200}, {row: 10, column: 10});

        expect(state.images.length).toBe(1);
        expect(state.images[0][0].url).toBe('notRemove');
    });

    test('Remove last image', () => {
        let images = [
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
        ];
        images.push([{url: 'notRemove', width: 100, height: 200}, {url: 'remove', width: 100, height: 200}]);

        const state = ACTIONS[ACTIONS_TYPES.REMOVE]({images, screenWidth: 200}, {row: 3, column: 1});

        expect(state.images.length).toBe(images.length);
        expect(state.images.flat(1).length).toBe(images.flat(1).length - 1);
        expect(state.images.every(row => row.every(({url}) => url !== 'remove'))).toBe(true);
    });

    test('Remove middle image', () => {
        let images = [
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'remove', width: 100, height: 200}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
            [{url: 'url1', width: random(1000), height: 350 + random(1000)}, {url: 'url1', width: random(1000), height: 350 + random(1000)}],
        ];
        
        const state = ACTIONS[ACTIONS_TYPES.REMOVE]({images, screenWidth: 200}, {row: 1, column: 0});

        expect(state.images.flat(1).length).toBe(images.flat(1).length - 1);
        expect(state.images.every(row => row.every(({url}) => url !== 'remove'))).toBe(true);
    });
});