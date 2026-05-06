"use strict";

function MakeRentalDealList({
    dealList = [{}],
    title = "Untitled Rental Deal List",
    sectionNote = "Browse available options below."
} = {}) {

    var dealListComp = document.createElement("div");
    dealListComp.classList.add("rentalDealList");

    var currentDealList = [...dealList];

    function makeRentalDealPrivate({
        image = "pics/car 2.jpg",
        dealName = "Standard Package",
        dailyRate = 100,
        days = 1
    } = {}) {

        var rentalDealDiv = document.createElement("div");
        rentalDealDiv.classList.add("rentalDeal");

        var totalCost = dailyRate * days;

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
                totalCost = dailyRate * days;
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

    function sortByName() {
        currentDealList.sort(function (a, b) {
            var nameA = (a.dealName || "").toUpperCase();
            var nameB = (b.dealName || "").toUpperCase();

            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0;
        });
        render();
    }

    function sortByRate() {
        currentDealList.sort(function (a, b) {
            var rateA = Number(a.dailyRate) || 0;
            var rateB = Number(b.dailyRate) || 0;
            return rateA - rateB;
        });
        render();
    }

    function render() {
        dealListComp.innerHTML = `
            <h2>${title}</h2>
            <p class="listNote">${sectionNote}</p>

            <div class="sortRow">
                <button class="sortNameBtn">Sort by Name</button>
                <button class="sortRateBtn">Sort by Daily Rate</button>
            </div>

            <div class="dealListItems"></div>
        `;

        var sortNameBtn = dealListComp.getElementsByClassName("sortNameBtn")[0];
        var sortRateBtn = dealListComp.getElementsByClassName("sortRateBtn")[0];
        var dealListItems = dealListComp.getElementsByClassName("dealListItems")[0];

        sortNameBtn.onclick = sortByName;
        sortRateBtn.onclick = sortByRate;

        for (var i = 0; i < currentDealList.length; i++) {
            dealListItems.appendChild(makeRentalDealPrivate(currentDealList[i]));
        }
    }

    render();
    return dealListComp;
}