// take a str, the button label and return a element
// module.exports is the similar to default export in esm
// const makeButton = (buttonName)=>{
//     return `Button: ${buttonName}`
// }

const makeButton = (buttonName) => {
    const buttonLabel = `Button: ${buttonName}`;

    const button = document.createElement('button');
    button.innerText = buttonLabel;

    return button;
}



module.exports = makeButton;