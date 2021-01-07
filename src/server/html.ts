
function meta(t: Function) {
    const baseSpace = 'home';
    const metaData = t(baseSpace, { returnObjects: true });
    return `
        <meta name="robots" content="index, follow">
        <title>${metaData['title']}</title>
        <meta name="description" content="${metaData['desc']}">
    `;
}

function html(body: string, lang_lamda: Function) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                ${meta(lang_lamda)}
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="css/main.css" rel="stylesheet">
            </head>
            <body style="margin:0">
                <div id="app">${body}</div>
                <script src="js/bundle.js" defer></script>
            </body>
        </html>
    `;
}

export default html;