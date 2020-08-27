
<div align="center">
	<img src="https://github.com/aromalanil/get-ascii-image/blob/master/demo/cover_image.jpg?raw=true" alt="Cover Image"></img>
    <h1>get-ascii-image</h1>
    <p>A zero dependency image to ascii convertor for Web🌐</p>
	<br/>
	<div align="center">
	<img alt="npm" src="https://img.shields.io/npm/v/get-ascii-image?style=for-the-badge">
	<a href="https://github.com/aromalanil/get-ascii-image/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/aromalanil/get-ascii-image?style=for-the-badge"></a>
	<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/get-ascii-image?style=for-the-badge">
	<img alt="GitHub issues" src="https://img.shields.io/github/issues/aromalanil/get-ascii-image?style=for-the-badge">
	</div>
</div>

## ⚙ Installation

```bash
# Using npm
npm i get-ascii-image

# Using yarn
yarn add get-ascii-image
```

<br/>

>Note : **This is a frontend only package**. (Because this package uses Canvas API of the DOM)

<br/>

## 🍰 Example

```js
const getAsciiImage = require('get-ascii-image');

const imageURL = 'https://example.com/image.jpg';

const config = {
	maxWidth:100,
	maxHeight:300
};

getAsciiImage(imageURL,config)
	.then(ascii=>{
		document.getElementById('image-container').innerText = ascii;
	})
	.catch(err=>{
		console.log(err);
	}
});
```

## 🧵 Syntax

### Using  async-await ✋🏻
```js
const getAsciiImage = require('get-ascii-image');

//inside an async function
try{
	//Returns Ascii Image as a string
	let asciiImage = await getAsciiImage(imageSource,config);
}
catch(err){
	console.log(err);
}
```
### Using Promise 🤝🏻
```js
const getAsciiImage = require('get-ascii-image');

getAsciiImage(imageSource,config)
	.then(ascii=>{
		let asciiImage = ascii;
	})
	.catch(err=>{
		console.log(err);
	});

```

## 🍬 Parameters

- ``imageSource`` (*String*) : The absolute path to the image source.
	
- ``config`` (*Function*) : An object with two values namely maxWidth and maxHeight.
	- *maxWidth* : Maximum ascii characters in one row of generated Ascii image. Default value is 300
	- *maxHeight* : Maximum ascii characters in one column of generated Ascii image . Default value is 300

## 🔗 Miscellaneous

- In case you are taking the image from an external link, make sure the response to the link request contains the header ``Access-Control-Allow-Origin: *`` in it.

## 📜 License

```
MIT License

Copyright (c) 2020 Aromal Anil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## ✍🏻 Author
[Aromal Anil](https://aromalanil.me)
