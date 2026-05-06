"use strict";

function MakeRentalDealListR_CGF() {

    return (
        <div>
            <MakeRentalDealListR
                json="json/rentalDealsA.json"
                title="Premium Rental Deals"
                note="Luxury and business packages"
            />

            <MakeRentalDealListR
                json="json/rentalDealsB.json"
                title="More Rental Deals"
                note="Flexible options for different budgets"
            />

            <MakeRentalDealListR />
        </div>
    );
}