/**
 * This has to be used in combination with some way to update and track the current
 * snippet that we want to bind to. For example a Reveal.js 'slidechanged' event.
 */

document.onkeyup = function (event) {
    if (event.ctrlKey) {
        // Running. Ctrl+F9 / Ctrl+R (Mac)
        if ((event.keyCode === 82 && window.navigator.appVersion.indexOf("Mac") !== -1) ||
            (event.keyCode === 120 && window.navigator.appVersion.indexOf("Mac") === -1)) {
            CurrentSnippets.map((arrowSnippet) => {
                arrowSnippet.view.execute();
        });
            window.dispatchEvent(new Event('resize'));
        }
        // Folding. Ctrl+F8 / Ctrl+F (Mac)
        else if ((event.keyCode === 70 && window.navigator.appVersion.indexOf("Mac") !== -1) ||
            (event.keyCode === 119 && window.navigator.appVersion.indexOf("Mac") === -1)) {
            CurrentSnippets.map((arrowSnippet) => {
                arrowSnippet.view.update({folded: !arrowSnippet.view.state.folded});
        });
            window.dispatchEvent(new Event('resize'));
        }
    }
};