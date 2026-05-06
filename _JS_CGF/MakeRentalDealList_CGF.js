"use strict";

function MakeRentalDealList_CGF() {

    var ele = document.createElement("div");

    ele.innerHTML = `
        <div class="dealListFlex">
            <div class="firstDealList"></div>
            <div class="secondDealList"></div>
            <div class="thirdDealList"></div>
        </div>
    `;

    var firstDiv = ele.getElementsByClassName("firstDealList")[0];
    var secondDiv = ele.getElementsByClassName("secondDealList")[0];
    var thirdDiv = ele.getElementsByClassName("thirdDealList")[0];

    ajax("json/cars.json", processCars, firstDiv);
    ajax("json/reviews.json", processReviews, secondDiv);

    function processCars(carList) {

        var newDealList = [];

        for (var i = 0; i < carList.length; i++) {
            newDealList.push({
                image: carList[i].image,
                dealName: carList[i].year + " " + carList[i].make + " " + carList[i].model,
                dailyRate: Number(carList[i].dailyRate) || 0,
                days: carList[i].available ? 3 : 1
            });
        }

        newDealList.push({}); // required empty object test case

        firstDiv.appendChild(MakeRentalDealList({
            dealList: newDealList,
            title: "Luxury Rental Deal List",
            sectionNote: "Built from cars.json with one empty object added for testing."
        }));
    }

    function processReviews(reviewList) {

        var mappedReviewDeals = [];

        for (var i = 0; i < reviewList.length; i++) {
            mappedReviewDeals.push({
                image: reviewList[i].reviewPic,
                dealName: reviewList[i].reviewTitle,
                dailyRate: reviewList[i].starRating * 100,
                days: reviewList[i].reviewId
            });
        }

        secondDiv.appendChild(MakeRentalDealList({
            dealList: mappedReviewDeals,
            title: "Customer Experience Packages",
            sectionNote: "Built from reviews.json after mapping different property names."
        }));
    }

    thirdDiv.appendChild(MakeRentalDealList({}));

    return ele;
}