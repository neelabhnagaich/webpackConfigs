const makeImage = (url) =>{
    const image = document.createElement('img');
    image.src = url;
    return image;
}

export default makeImage;