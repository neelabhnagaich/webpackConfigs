import nav from "./nav";
import { bottom, top, footer } from "./footer";
import makeButton from "./button";
import {makeColorStyle} from './button-styles'
import './footer.css'
import './button.css'
import makeImage from "./image";
import imageUrl from "./webpack.jpeg";

const button = makeButton("my first");
button.style = makeColorStyle('cyan')
const image = makeImage(imageUrl);

document.body.appendChild(button);

document.body.appendChild(footer)

document.body.appendChild(image);