import selectable_fonts from "./fonts";
import fs from 'fs';

function mapFontsToStr(){
    selectable_fonts.sort((a,b) => a.font > b.font);
    return selectable_fonts.map((f) => {
        `@font-face {
            font-family: "Orbitron";
            src: url("./ttf_files/Orbitron.ttf");
        }`
    })
}

export function writeFontsToCSS(){
    fs.writeFile('./fonts.css', content, err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });


}