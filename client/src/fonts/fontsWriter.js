import selectable_fonts from "./fonts.js";
import { readdir, writeFile } from 'node:fs/promises';

async function writeFontsToJSON(){
    const defaultFontsList = ["Arial", "Times New Roman", "Yu Gothic"];

    try {
        const files = await readdir(`./src/fonts/ttf_files`);

        const customFonts = files.map((f) => {return `
    {
        "font": "${f.replace('.ttf','')}",
        "isProvidedFont": false,
    },`});

        const defaultFonts = defaultFontsList.map((f) => {return `
    {
        "font": "${f}",
        "isProvidedFont": true,
    },`});
        
        const ls = [...customFonts, ...defaultFonts].sort().join('\n');;

        const content = `const selectable_fonts = [
            ${ls}
]\n\nexport default selectable_fonts;`;

        writeFile('./src/fonts/fonts.js', content);
    } catch (err) {
        console.error(err);
    } 
}

function writeFontsToCSS(){
    // selectable_fonts.sort((a,b) => a.font > b.font);
    const content = 
    selectable_fonts.filter((f) => !f.isProvidedFont)
    .map((f) => {
        return `@font-face {
    font-family: "${f.font}";
    src: url("./ttf_files/${f.font}.ttf");
}`
    }).join('\n');

    try {
        writeFile('./src/fonts/fonts.css', content);
    } catch (err) {
        console.error(err);
    } 
}

writeFontsToJSON().then(writeFontsToCSS());