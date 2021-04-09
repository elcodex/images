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
        console.log(url);
        const size = await getImageSize(url);
        width = size.width;
        height = size.height;
    } else {
        if (!img.url) {
            throw new Error("Image url is empty or not provided");
        }

        if (!img.width || !img.height) {
            const size = getImageSize(img.url);
            width = size.width;
            height = size.height;
        }
    }

    if (!width || !height) {
        throw new Error("Image width or height cannot be 0");
    }

    return { url, width, height }
}

export function sumItems(items, callback) {
    return items.reduce(callback, 0);
}