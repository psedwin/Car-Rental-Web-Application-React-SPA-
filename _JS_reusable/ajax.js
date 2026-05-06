"use strict";

function ajax(url, successCallBackFn, errorEle) {

    var httpReq;

    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        errorEle.innerHTML += "Old browser -- AJAX not supported.";
        return;
    }

    httpReq.open("GET", url);

    httpReq.onreadystatechange = function () {

        if (httpReq.readyState === 4) {

            if (httpReq.status === 200) {
                var obj = JSON.parse(httpReq.responseText);
                successCallBackFn(obj);
            } else {
                errorEle.innerHTML += "Error " + httpReq.status + " - " +
                    httpReq.statusText + " while trying to read '" + url + "'";
            }
        }
    };

    httpReq.send(null);
}