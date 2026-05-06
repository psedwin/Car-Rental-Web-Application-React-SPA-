"use strict";

function SlideShow_CGF() {

    var ele = document.createElement("div");

    ele.innerHTML = `
        <div class="slideShowFlex">
            <div class="firstSlideShow"></div>
            <div class="secondSlideShow"></div>
            <div class="thirdSlideShow"></div>
        </div>
    `;

    var firstDiv = ele.getElementsByClassName("firstSlideShow")[0];
    var secondDiv = ele.getElementsByClassName("secondSlideShow")[0];
    var thirdDiv = ele.getElementsByClassName("thirdSlideShow")[0];

    ajax("json/cars.json", processCars, firstDiv);

    function processCars(carList) {

        var newCarObjList = [];

        for (var i = 0; i < carList.length; i++) {

            var featuresText = "None listed";
            if (Array.isArray(carList[i].features) && carList[i].features.length > 0) {
                featuresText = carList[i].features.join(", ");
            }

            newCarObjList[i] = {
                image: carList[i].image,
                caption: carList[i].year + " " + carList[i].make + " " + carList[i].model,
                info: `
                    <p><b>Daily Rate:</b> ${carList[i].dailyRate ? "$" + carList[i].dailyRate : "Not listed"}</p>
                    <p><b>Seats:</b> ${carList[i].seats ? carList[i].seats : "Not listed"}</p>
                    <p><b>Transmission:</b> ${carList[i].transmission}</p>
                    <p><b>Available:</b> ${carList[i].available ? "Yes" : "No"}</p>
                    <p><b>Features:</b> ${featuresText}</p>
                `
            };
        }

        var carSlideShow = MakeSlideShow({
            ssTitle: "Rental Car Options",
            ssObjList: newCarObjList,
            accentColor: "#7a5c00"
        });

        firstDiv.appendChild(carSlideShow);
    }

    ajax("json/reviews.json", processReviews, secondDiv);

    function processReviews(reviewList) {

        var newReviewObjList = [];

        for (var i = 0; i < reviewList.length; i++) {
            newReviewObjList[i] = {
                image: reviewList[i].reviewPic,
                caption: reviewList[i].customerName + " - " + reviewList[i].carBooked,
                info: `
                    <p><b>Rating:</b> ${reviewList[i].starRating}/5</p>
                    <p><b>Trip Type:</b> ${reviewList[i].tripType}</p>
                    <p><b>Comment:</b> ${reviewList[i].comment}</p>
                `
            };
        }

        var reviewSlideShow = MakeSlideShow({
            ssTitle: "Customer Reviews",
            ssObjList: newReviewObjList,
            accentColor: "#1f4fa3"
        });

        secondDiv.appendChild(reviewSlideShow);
    }

    var emptySlideShow = MakeSlideShow({});
    thirdDiv.appendChild(emptySlideShow);

    return ele;
}