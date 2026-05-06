"use strict";

function MakeTag(tagName, className, innerHTML) {
    var tag = document.createElement(tagName);

    if (className) {
        tag.className = className;
    }
    if (innerHTML !== undefined && innerHTML !== null) {
        tag.innerHTML = innerHTML;
    }

    return tag;
}