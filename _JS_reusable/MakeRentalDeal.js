"use strict";

function MakeRentalDeal({
    image = "pics/car 2.jpg",
    dealName = "Standard Package",
    dailyRate = 100,
    days = 1
} = {}) {

    let rentalDealDiv = document.createElement("div");
    rentalDealDiv.classList.add("rentalDeal");

    let totalCost = dailyRate * days;

    function display() {

        rentalDealDiv.innerHTML = `
            <h3>${dealName}</h3>
            <img src="${image}" alt="Rental Deal Image" />
            <p>Daily Rate: $${dailyRate}</p>
            <p>Days: ${days}</p>
            <p><b>Total Cost: $${totalCost}</b></p>
            <button class="addDayBtn">Add Day</button>
            <button class="upgradeBtn">Upgrade Deal</button>
        `;

        rentalDealDiv.querySelector(".addDayBtn").onclick = function () {
            days++;
            totalCost = dailyRate * days;  // not a simple setter
            display();
        };

        rentalDealDiv.querySelector(".upgradeBtn").onclick = function () {
            dealName += " + VIP";
            dailyRate += 50;
            totalCost = dailyRate * days;
            display();
        };
    }

    display();

    return rentalDealDiv;
}
