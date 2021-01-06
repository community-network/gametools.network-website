const html = ({ body }: { body: string }) => `
<!DOCTYPE html>
<html>
    <head>
        <link href="css/main.css" rel="stylesheet">
    </head>
    <body style="margin:0">
        <div id="app">${body}</div>
        <script src="js/bundle.js" defer></script>
    </body>
</html>
`;

export default html;