"use strict";

function HomeR() {

    const Link = ReactRouterDOM.Link;

    return (
        <div className="home">

            <h2>
                Find the Perfect Rental in Minutes
            </h2>

            <p>
                Welcome to <b>Car Rental</b> — a simple place to browse vehicles, compare daily rates,
                and quickly pick a ride that fits your budget and vibe. Whether you want something
                practical for everyday driving or something premium for a special weekend, this site
                helps you explore options fast.
            </p>

            <p>
                You’ll be able to view vehicle details, pricing, and availability — all powered by clean
                JSON data behind the scenes. Click into the Blog to see how the site is built and what
                I learned while making it.
            </p>

            <Link to="/blog" className="homeBtn">
                Go to Blog &amp; Details
            </Link>

            <div className="homeHero">
                <img
                    src="pics/car rental logo.jpg"
                    alt="Car Rental logo"
                />
            </div>

        </div>
    );
}
