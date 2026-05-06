"use strict";

function MakeRentalDeal_CGF() {

    let container = document.createElement("div");

    container.appendChild(MakeRentalDeal({
        image: "pics/Car 1.jpg",
        dealName: "Luxury Weekend Package",
        dailyRate: 500,
        days: 2
    }));

    container.appendChild(MakeRentalDeal({
        image: "pics/car 3.jpg",
        dealName: "Executive Business Package",
        dailyRate: 700,
        days: 3
    }));

    container.appendChild(MakeRentalDeal({}));

    return container;
}
