function require(file) {

    const myRoot = window.requirePaths[file] || '';
    if (myRoot) myRoot += '/';

    function loadFile(file) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", file, false);
        xhr.send();
        return xhr.responseText;
    }

    if (file.startsWith('./')) file = file.substr(2);
    if (!file.includes('.')) file = file + '.js';

    const contents = loadFile(myRoot + file);
    const root = file.split('/').slice(0, -1).join('/');
    window.requirePaths[file] = root;
    const exports = eval(`(() => {
        module = { exports: null };
        ${contents}
        return module.exports;
    })()`);
    return exports;
}

window.require = require;
window.requirePaths = {};