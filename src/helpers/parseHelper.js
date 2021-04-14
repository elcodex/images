const ERRORS = {
    EMPTY_URL: 'Image url is empty or not provided',
    EMPTY_SIZE: 'Image width or height cannot be 0',
    LOAD: 'Could not load file '
}

export async function getImages(files) {
    let images = [];
    for (let i = 0; i < files.length; i++) {
        try {
            if (files[i].name.endsWith('.json')) {
                const newImages = await parseJSON(files[i]);
                images.push(...newImages);
            } else {
                const image = await getImageProperties(files[i]);
                images.push(image);
            }
        } catch(error) {
            console.log(files[i].name, ':', error.message);
        }
    }

    return images;
}

function getImageSize(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            resolve({width: img.width, height: img.height});
        }
        img.onerror = () => {
            reject();
        }
    });
}

export async function getImageProperties(img) {
    let url, width, height;
    if (img instanceof File) {
        URL.revokeObjectURL(img);
        url = URL.createObjectURL(img);
        const size = await getImageSize(url);
        width = size.width;
        height = size.height;
    } else {
        if (!img.url) {
            throw new Error(ERRORS.EMPTY_URL);
        } else {
            url = img.url;
        }

        if (!img.width || !img.height) {
            const size = await getImageSize(img.url);
            width = size.width;
            height = size.height;
        } else {
            width = img.width;
            height = img.height;
        }
    }

    if (!width || !height) {
        throw new Error(ERRORS.EMPTY_SIZE);
    }

    return { url, width, height }
}

async function parseJSON(file) {
    const url = URL.createObjectURL(file);
    const response = await fetch(url);
    URL.revokeObjectURL(url);
    
    if (!response.ok) {
        throw new Error(ERRORS.LOAD + file.name);
    }
    
    const data = (await response.json()).galleryImages;
    let images = [];
    for (let image of data) {
        try {
            images.push(await getImageProperties(image));
        } catch(error) {
            console.lof(error.message);
        }
    }

    return images;
}