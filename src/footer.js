import { red, blue } from "./button-styles";


const top = document.createElement('div');
top.innerText = "Top on footer"
top.style = red;

const bottom = document.createElement('div');
bottom.innerText  = "Bottom on footer"
bottom.style = blue;

const footer = document.createElement('footer');
footer.appendChild(top);
footer.appendChild(bottom);
 

export {top, bottom, footer};