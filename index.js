/** 
 * @description Generates an ascii image (ascii art) by taking an image source as input.
 * @param {string} imageSource The absolute path to the image
 * @param {object} [config] Configuration object
 * @param {number} [config.maxWidth=300] - Maximum ascii characters in one row of generated Ascii image.
 * @param {number} [config.maxHeight=500] - Maximum ascii characters in one column of generated Ascii image .
 * @return {string} The ascii image 
 */
const getAsciiImage = (imageSource, config) => {

    let maxWidth, maxHeight;

    if (!imageSource) {
        return new Promise((resolve, reject) => {
            reject(new Error('Invalid image source'));
        })
    }
    if (config) {
        maxHeight = config.maxHeight;
        maxWidth = config.maxWidth;
    }

    //Creating canvas and context for image manipulation
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    return new Promise((resolve, reject) => {

        const image = new Image();

        //Function to be run after image is loaded
        image.onload = () => {

            //Reducing width and height based on maxWidth and maxHeight preserving Aspect-ratio
            const [width, height] = _reduceDimension(image.width, image.height, maxWidth || 300, maxHeight || 500);

            canvas.width = width;
            canvas.height = height;

            //Since width and height are reduced this will generate low res image
            context.drawImage(image, 0, 0, width, height);

            const grayScaleArray = _canvasToGrayScale(context, width, height);

            resolve(_getAsciiFromGrayScaleArray(grayScaleArray, width));
        }
        image.onerror = reject(new Error("Unable to load image"));
        image.src = imageSource;
    });
}
//Function returns a width and height array which falls under maxWidth and maxHeight respectively 
//preserving the Aspect-ratio
const _reduceDimension = (width, height, maxWidth, maxHeight) => {

    if (width > maxWidth) {
        //Calculating new height using maximum width as the width
        height = Math.floor((height * maxWidth) / width);
        width = maxWidth;
    }
    if (height > maxHeight) {
        //Calculating new width using  maximum height and height
        width = Math.floor((width * maxHeight) / height);
        height = maxHeight;
    }

    return [width, height];
}

//Returns an array with grayscale values of each pixel
const _canvasToGrayScale = (context, width, height) => {

    //Getting underlying pixel data from canvas
    const imgDataObject = context.getImageData(0, 0, width, height);
    const imgData = imgDataObject.data;

    const grayScaleArray = [];

    //Traversing through pixel data, getting rgba and converting it to grayscale
    for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];

        let grayScale = _rgbToGrayScale(r, g, b);

        //Adding grayscale data to array
        grayScaleArray.push(grayScale);
    }

    return grayScaleArray;
}


//Function to convert rgb to corresponding grayscale number
const _rgbToGrayScale = (r, g, b) => (0.3 * r) + (0.59 * g) + (0.11 * b);

//Returns an Ascii string
const _getAsciiFromGrayScaleArray = (grayScaleArray, width) => {

    //70 Ascii shades of grey in descending order of intensity;
    let asciiIntensityArray = ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "|", "(", ")", "1", "{", "}", "[", "]", "?", "-", "_", "+", "~", "<", ">", "i", "!", "l", "I", ";", ":", ",", '"', "^", "`", "'", ".", " "];
    let noOfShades = asciiIntensityArray.length;

    let asciiImage = "";

    grayScaleArray.forEach((grayScale, index) => {

        //Converting Grayscale value to corresponding ascii character
        let asciiCorrespondent = asciiIntensityArray[Math.ceil((grayScale / 255) * (noOfShades - 1))];

        //Adding new line at the end of each row traversal
        if ((index + 1) % width === 0) {
            asciiCorrespondent += "\n";
        }
        asciiImage += asciiCorrespondent + " ";
    });
    return asciiImage;
}


module.exports = getAsciiImage; 
