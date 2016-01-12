
// An expanded version of the button content from here:
// https://www.mendeley.com/import/

var body = document.getElementsByTagName('body')[0];
var newScript = document.createElement('script');

newScript.setAttribute('src', 'https://www.mendeley.com/minified/bookmarklet.js');
body.appendChild(newScript);