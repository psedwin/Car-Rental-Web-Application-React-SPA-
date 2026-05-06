"use strict";

function MakeEditArea_CGF() {

    var page = MakeTag("div", "validatePage");
    var intro = MakeTag("div", "validateIntro");
    var layout = MakeTag("div", "validateGrid");
    var leftColumn = MakeTag("div", "validateColumn");
    var rightColumn = MakeTag("div", "validateColumn");
    var reservationMessage = MakeTag("div", "messageArea");
    var feedbackMessage = MakeTag("div", "messageArea");

    intro.innerHTML = `
        <h1>Edit Areas</h1>
        <p>
            This page shows two different edit areas for my car rental site. The first one is pre-filled
            to simulate editing an existing reservation. The second one starts blank to simulate creating
            a new customer feedback record.
        </p>
    `;

    var reservationSpecs = [
        {
            prompt: "Reservation Name",
            fieldName: "reservationName",
            dataType: "string",
            isRequired: true,
            minLen: 3,
            maxLen: 25
        },
        {
            prompt: "Pick Up Date",
            fieldName: "pickupDate",
            dataType: "date",
            isRequired: true
        },
        {
            prompt: "Daily Rate",
            fieldName: "dailyRate",
            dataType: "number",
            isRequired: true,
            minVal: 40,
            maxVal: 500
        },
        {
            prompt: "Rental Days",
            fieldName: "rentalDays",
            dataType: "integer",
            isRequired: true,
            minVal: 1,
            maxVal: 21
        },
        {
            prompt: "Vehicle Class",
            fieldName: "vehicleClass",
            dataType: "radio",
            isRequired: true,
            defaultValue: "Luxury",
            options: ["Economy", "SUV", "Luxury"]
        },
        {
            prompt: "Pick Up Branch",
            fieldName: "pickupBranch",
            dataType: "select",
            isRequired: true,
            defaultValue: "Airport",
            options: ["Downtown", "Airport", "Suburban"]
        }
    ];

    var reservationEditObj = {
        reservationName: "Weekend Escape",
        pickupDate: "2026-04-18",
        dailyRate: 185.5,
        rentalDays: 4,
        vehicleClass: "Luxury",
        pickupBranch: "Airport"
    };

    var feedbackSpecs = [
        {
            prompt: "Reviewer Name",
            fieldName: "reviewerName",
            dataType: "string",
            isRequired: true,
            minLen: 2,
            maxLen: 30
        },
        {
            prompt: "Review Date",
            fieldName: "reviewDate",
            dataType: "date",
            isRequired: false
        },
        {
            prompt: "Would Rent Again",
            fieldName: "wouldRentAgain",
            dataType: "radio",
            isRequired: true,
            options: ["Yes", "No"]
        },
        {
            prompt: "Favorite Feature",
            fieldName: "favoriteFeature",
            dataType: "select",
            isRequired: false,
            options: ["Clean Interior", "Fast Pickup", "Luxury Feel", "Affordable Price"]
        },
        {
            prompt: "Comments",
            fieldName: "comments",
            dataType: "string",
            isRequired: true,
            minLen: 10,
            maxLen: 80
        }
    ];

    var reservationArea = MakeEditArea({
        title: "Edit Reservation",
        fieldSpecs: reservationSpecs,
        editObj: reservationEditObj,
        submitLabel: "Save Reservation",
        cancelLabel: "Cancel Edit",
        onSubmit: function (goodObj) {
            reservationMessage.innerHTML = `
                <h3>Reservation Saved</h3>
                <p>Your reservation update is ready to be sent to the rental system.</p>
                ${formatObjectHtml(goodObj)}
            `;
        },
        onCancel: function () {
            reservationMessage.innerHTML = `
                <h3>Reservation Not Saved</h3>
                <p>Sorry you decided not to update this reservation right now.</p>
            `;
        }
    });

    var feedbackArea = MakeEditArea({
        fieldSpecs: feedbackSpecs,
        submitLabel: "Submit Feedback",
        cancelLabel: "Skip Feedback",
        onSubmit: function (goodObj) {
            feedbackMessage.innerHTML = `
                <h3>Feedback Submitted</h3>
                <p>Thanks for sharing your customer experience with our rental team.</p>
                ${formatObjectHtml(goodObj)}
            `;
        },
        onCancel: function () {
            feedbackMessage.innerHTML = `
                <h3>Feedback Not Submitted</h3>
                <p>Sorry you decided not to leave a customer feedback record today.</p>
            `;
        }
    });

    leftColumn.appendChild(reservationArea);
    leftColumn.appendChild(reservationMessage);
    rightColumn.appendChild(feedbackArea);
    rightColumn.appendChild(feedbackMessage);

    layout.appendChild(leftColumn);
    layout.appendChild(rightColumn);
    page.appendChild(intro);
    page.appendChild(layout);

    reservationMessage.innerHTML = "<h3>Reservation Message Area</h3><p>Submit or cancel the reservation edit to see what would be sent back.</p>";
    feedbackMessage.innerHTML = "<h3>Feedback Message Area</h3><p>Submit or cancel the feedback form to see the callback result.</p>";

    return page;
}

function formatObjectHtml(goodObj) {
    var html = "<div class='objectEcho'>";

    for (var key in goodObj) {
        if (Object.prototype.hasOwnProperty.call(goodObj, key)) {
            html += "<div><span class='echoKey'>" + key + ":</span> <span class='echoVal'>" + goodObj[key] + "</span></div>";
        }
    }

    html += "</div>";
    return html;
}