"use strict";

function MakeSlideShow({
    ssTitle = "Untitled Slide Show",
    ssObjList = [
        {
            image: "pics/car 2.jpg",
            caption: "Default Slide",
            info: "<p>More information coming soon.</p>"
        }
    ],
    accentColor = "#0b1f3a"
} = {}) {

    if (!Array.isArray(ssObjList) || ssObjList.length === 0) {
        ssObjList = [
            {
                image: "pics/car 2.jpg",
                caption: "Default Slide",
                info: "<p>More information coming soon.</p>"
            }
        ];
    }

    var slideShow = document.createElement("div");
    slideShow.classList.add("slideShow");

    var picNum = 0;
    var infoShowing = false;

    var storageKey = "slideShow_" + ssTitle.replace(/\s+/g, "_");

    var savedPicNum = persist.getItem(storageKey);
    if (savedPicNum !== null) {
        savedPicNum = parseInt(savedPicNum);
        if (!isNaN(savedPicNum) && savedPicNum >= 0 && savedPicNum < ssObjList.length) {
            picNum = savedPicNum;
        }
    }

    function display() {

        var currentObj = ssObjList[picNum];

        slideShow.innerHTML = `
            <div class="ssCard" style="border-top: 8px solid ${accentColor};">
                <h2>${ssTitle}</h2>

                <div class="ssImgWrap">
                    <img src="${currentObj.image}" alt="${currentObj.caption}">
                </div>

                <p class="ssCaption">${currentObj.caption}</p>

                <div class="ssButtonRow">
                    <button class="backBtn">&lt;</button>
                    <button class="fwdBtn">&gt;</button>
                </div>

                <div class="ssInfoBtnRow">
                    <button class="showInfoBtn ${infoShowing ? "hide" : "show"}">Show Info</button>
                    <button class="hideInfoBtn ${infoShowing ? "show" : "hide"}">Hide Info</button>
                </div>

                <div class="ssInfo ${infoShowing ? "showBlock" : "hideBlock"}">
                    ${currentObj.info}
                </div>

                <p class="ssCounter">Slide ${picNum + 1} of ${ssObjList.length}</p>
            </div>
        `;

        var backBtn = slideShow.getElementsByClassName("backBtn")[0];
        var fwdBtn = slideShow.getElementsByClassName("fwdBtn")[0];
        var showInfoBtn = slideShow.getElementsByClassName("showInfoBtn")[0];
        var hideInfoBtn = slideShow.getElementsByClassName("hideInfoBtn")[0];

        backBtn.onclick = function () {
            if (picNum > 0) {
                picNum--;
            } else {
                picNum = ssObjList.length - 1;
            }
            persist.setItem(storageKey, picNum);
            infoShowing = false;
            display();
        };

        fwdBtn.onclick = function () {
            if (picNum < ssObjList.length - 1) {
                picNum++;
            } else {
                picNum = 0;
            }
            persist.setItem(storageKey, picNum);
            infoShowing = false;
            display();
        };

        showInfoBtn.onclick = function () {
            infoShowing = true;
            display();
        };

        hideInfoBtn.onclick = function () {
            infoShowing = false;
            display();
        };
    }

    display();

    slideShow.setPicNum = function (newPicNum) {
        if (newPicNum >= 0 && newPicNum < ssObjList.length) {
            picNum = newPicNum;
            persist.setItem(storageKey, picNum);
            infoShowing = false;
            display();
        }
    };

    return slideShow;
}