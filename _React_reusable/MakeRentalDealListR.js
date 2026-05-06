"use strict";

function MakeRentalDealListR({
    json = null,
    title = "Untitled Rental Deal List",
    note = "Browse available deals below"
}) {

    const [dealList, setDealList] = React.useState([]);

    React.useEffect(() => {
        if (json) {
            fetch(json)
                .then(res => res.json())
                .then(data => setDealList(data));
        }
    }, [json]);

    function sortByName() {
        let sorted = [...dealList].sort((a, b) =>
            (a.dealName || "").localeCompare(b.dealName || "")
        );
        setDealList(sorted);
    }

    function sortByRate() {
        let sorted = [...dealList].sort((a, b) =>
            (Number(a.dailyRate) || 0) - (Number(b.dailyRate) || 0)
        );
        setDealList(sorted);
    }

    function MakeDealR({
        image = "pics/car 2.jpg",
        dealName = "Standard Package",
        dailyRate = 100,
        days = 1
    }) {

        const [rate, setRate] = React.useState(dailyRate);
        const [numDays, setNumDays] = React.useState(days);

        let totalCost = rate * numDays;

        return (
            <div className="rentalDeal">

                <h3>{dealName}</h3>
                <img src={image} alt="deal" />

                <p>Daily Rate: ${rate}</p>
                <p>Days: {numDays}</p>
                <p><b>Total: ${totalCost}</b></p>

                {/* SIMPLE MODIFICATION */}
                <button onClick={() => setNumDays(numDays + 1)}>
                    Add Day
                </button>

                {/* COMPLEX MODIFICATION */}
                <button onClick={() => setRate(rate + 50)}>
                    Upgrade (+50)
                </button>

            </div>
        );
    }

    return (
        <div className="rentalDealList">

            <h2>{title}</h2>
            <p>{note}</p>

            <button onClick={sortByName}>Sort by Name</button>
            <button onClick={sortByRate}>Sort by Rate</button>

            <div className="dealListItems">
                {dealList.map((d, i) => (
                    <MakeDealR key={i} {...d} />
                ))}
            </div>

        </div>
    );
}