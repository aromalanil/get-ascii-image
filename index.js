/** 
 * Takes an image source and converts it into ASCII art.
 * @param {string} imageSource The absolute path to the image
 * @param {Object} [config] Object to specify configuration for the output.
 * @param {number} [config.maxWidth=300] Character limit in one row of the generated ASCII image.
 * @param {number} [config.maxHeight=500] Character limit in one column of the generated ASCII image .
 * @param {Array.<string>} [config.avoidedCharacters=null] Array of ASCII characters that are to be avoided from the output.
 * @return {Promise} Promise object representing the generated ASCII string.
 */
const getAsciiImage = (imageSource, config) => {

    let maxWidth, maxHeight, avoidedCharacters;

    if (!imageSource) {
        return new Promise((resolve, reject) => {
            reject(new Error('Invalid image source'));
        })
    }
    if (config) {
        maxHeight = config.maxHeight || 500;
        maxWidth = config.maxWidth || 300;
        avoidedCharacters = config.avoidedCharacters || null;
    }

    //Creating canvas and context for image manipulation
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    return new Promise((resolve, reject) => {

        const image = new Image();

        //To solve cross origin image access
        image.crossOrigin = "Anonymous";

        //Function to be run after image is loaded
        image.onload = () => {

            //Reducing width and height based on maxWidth and maxHeight preserving Aspect-ratio
            const [width, height] = _reduceDimension(image.width, image.height, maxWidth, maxHeight);

            canvas.width = width;
            canvas.height = height;

            //Since width and height are reduced this will generate low res image
            context.drawImage(image, 0, 0, width, height);

            const grayScaleArray = _canvasToGrayScale(context, width, height);

            resolve(_getAsciiFromGrayScaleArray(grayScaleArray, width, avoidedCharacters));
        }
        image.onerror = () => reject(new Error("Unable to load image"));
        image.src = imageSource;
    });
}

/**
 * Decrease the width and height to fit in the limit, preserving the aspect-ratio.
 * @param {int} width The width to be decreased.
 * @param {int} height The height to be decreased.
 * @param {int} maxWidth The maximum height possible.
 * @param {int} maxHeight The maximum height possible.
 * @return {Array.<int>} The array containing reduced width and height respectively. 
 */
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

/**
 * 
 * Generates an array with grayscale values of each pixel from the context.
 * @param {Object} context The context of the canvas, from which the image is to be taken.
 * @param {int} width The width of the image.
 * @param {int} height The height of the image.
 * @return {Array.<int>} Array containing the grayscale values corresponding to each pixels.
 */
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

/**
 * 
 * Converts rgb to corresponding grayscale value.
 * @param {int} r Value of red (0 to 255).
 * @param {int} g Value of green (0 to 255).
 * @param {int} b Value of blue (0 to 255).
 * @return {int} Grayscale scale value calculated from rgb (0 to 255).
 */
const _rgbToGrayScale = (r, g, b) => (0.3 * r) + (0.59 * g) + (0.11 * b);


/**
 * 
 * Generates ASCII string from the grayscale array.
 * @param {Array.<int>} grayScaleArray Array containing the grayscale values corresponding to each pixels.
 * @param {int} width Width of the image.
 * @param {Array.<string>} avoidedCharacters Array of ASCII characters that are to be avoided from the output.
 * @return {string} String containing the generated ASCII image.
 */
const _getAsciiFromGrayScaleArray = (grayScaleArray, width, avoidedCharacters) => {

    //70 ASCII shades of grey in descending order of intensity;
    let asciiIntensityArray = ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "|", "(", ")", "1", "{", "}", "[", "]", "?", "-", "_", "+", "~", "<", ">", "i", "!", "l", "I", ";", ":", ",", '"', "^", "`", "'", ".", " "];

    //Removing unwanted characters from the array
    if (avoidedCharacters) {
        asciiIntensityArray = asciiIntensityArray.filter(asciiChar => !avoidedCharacters.includes(asciiChar));
    }

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
