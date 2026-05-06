"use strict";

function BlogR() {

    return (
        <div className="blog">

            <h2>Blog &amp; Project Notes</h2>

            <p className="blogIntro">
                This page holds notes and reflections for each homework/module in this course.
                I’m keeping it organized using headings so it’s easy to scan.
            </p>

            <div className="blogSection">
                <h3>My Web Development Experience</h3>
                <p>
                    I don’t have a lot of formal web development experience yet. Most of my background comes from
                    programming courses where I worked with languages like Python and Java. I’ve also dabbled
                    in HTML before, but building a full page with layout rules is newer to me.
                </p>
            </div>

            <div className="blogSection">
                <h3>Web Site Data (JSON)</h3>
                <p>
                    My web site uses JSON data to store information about available rental cars.
                </p>
                <p>
                    View the JSON data:&nbsp;
                    <a href="json/cars.json" target="_blank">cars.json</a>
                </p>
                <p>
                    For safe driving tips, visit:&nbsp;
                    <a href="https://www.nhtsa.gov/" target="_blank">NHTSA</a>
                </p>
            </div>

            <div className="blogSection">
                <h3>HW01 Homepage Reflection</h3>
                <p>
                    <b>What was easiest:</b> Creating the basic HTML structure and filling in content.
                </p>
                <p>
                    <b>What was hardest/confusing:</b> Managing spacing with a fixed title and nav bar.
                </p>
                <p>
                    <b>What was valuable:</b> Learning how responsive layouts work.
                </p>
            </div>

            <div className="blogSection">
                <h3>HW02 SPA Reflection</h3>
                <p>
                    <b>What felt easy:</b> Understanding how content generating functions work with routing.
                </p>
                <p>
                    <b>What felt hard/confusing:</b> Making sure all the files were connected correctly and
                    debugging when I got a blank screen.
                </p>
                <p>
                    <b>What was valuable:</b> Seeing how SPAs update content dynamically without reloading the page.
                </p>
            </div>

            <div className="blogSection">
                <h3>HW03 JS Object Component Reflection</h3>
                <p>
                    <b>What was easy:</b> Once I understood the pattern, creating the reusable Make function and
                    calling it multiple times from the CGF felt straightforward. Using a destructured parameter
                    object with default values made it easier to test the empty object case.
                </p>
                <p>
                    <b>What was hard/confusing:</b> The biggest challenge was making sure the UI always matched the
                    updated values. I learned that I needed a private display function and had to call it again
                    after each event handler updates values.
                </p>
                <p>
                    <b>What was valuable:</b> This homework helped me understand reusable components without React.
                    It also reinforced good design rules like dependency injection, avoiding global variables/ids,
                    and keeping styling in a component-specific CSS file.
                </p>
            </div>

            <div className="blogSection">
                <h3>HW04 JS Slide Show Reflection</h3>
                <p>
                    <b>What I did:</b> I created a reusable JavaScript slideshow component that reads data from
                    JSON files using AJAX. One slideshow displays rental car data, another displays customer review
                    data, and a third one shows that the component still works when an empty object is passed in.
                </p>
                <p>
                    <b>What was easy:</b> Once I understood the reusable component pattern from the earlier homework,
                    it was easier to connect a new Make function to a CGF and use it more than once.
                </p>
                <p>
                    <b>What was hard/confusing:</b> The hardest part was converting the raw JSON data into a new
                    object list with the exact field names my slideshow expected, and making sure the hidden info
                    could be shown and hidden correctly.
                </p>
                <p>
                    <b>What was valuable:</b> This homework helped me understand AJAX, persistence with local storage,
                    and how to build a reusable slideshow that can work with different types of JSON data.
                </p>
                <p>
                    View the JSON files:&nbsp;
                    <a href="json/cars.json" target="_blank">cars.json</a>
                    &nbsp;|&nbsp;
                    <a href="json/reviews.json" target="_blank">reviews.json</a>
                </p>
            </div>

            <div className="blogSection">
                <h3>HW05 JS Object List Reflection</h3>
                <p>
                    <b>What was easy:</b> Once I understood the earlier reusable component pattern,
                    it was easier to build a list component that repeatedly called a private Make function.
                </p>
                <p>
                    <b>What was hard/confusing:</b> The hardest part was making sure the list worked with
                    two different JSON files and converting the second JSON file into the property names
                    that my list component expected.
                </p>
                <p>
                    <b>What was valuable:</b> This homework helped me understand how to build reusable
                    object lists, add sorting, and keep my JavaScript organized inside a Single Page Application.
                </p>
                <p>
                    View the JSON files:&nbsp;
                    <a href="json/cars.json" target="_blank">cars.json</a>
                    &nbsp;|&nbsp;
                    <a href="json/reviews.json" target="_blank">reviews.json</a>
                </p>
            </div>

            <div className="blogSection">
                <h3>HW06 Input Component Reflection</h3>
                <p>
                    <b>What was easy:</b> Once I understood how the reusable component pattern worked,
                    it was easier to build two edit areas from the same MakeEditArea function.
                </p>
                <p>
                    <b>What was hard/confusing:</b> The hardest part was making all the validation types
                    work correctly, especially handling required versus optional fields and making sure the
                    error messages were actually helpful.
                </p>
                <p>
                    <b>What was valuable:</b> This homework helped me understand provider style code better,
                    how to validate multiple kinds of input, and how to build a more reusable and professional
                    JavaScript component for a Single Page Application.
                </p>
            </div>

            {/* ✅ ONLY ADDITION */}
            <div className="blogSection">
                <h3>HW07 React Object List Reflection</h3>
                <p>
                    <b>What was easy:</b> Converting the JavaScript object list into React using useState and mapping over the data.
                </p>
                <p>
                    <b>What was hard/confusing:</b> Debugging when the page did not load and making sure all files and JSON data were connected correctly.
                </p>
                <p>
                    <b>What was valuable:</b> Learning how React handles dynamic data, state updates, and reusable components.
                </p>
                <p>
                    View JSON files:&nbsp;
                    <a href="json/rentalDealsA.json" target="_blank">rentalDealsA.json</a>
                    &nbsp;|&nbsp;
                    <a href="json/rentalDealsB.json" target="_blank">rentalDealsB.json</a>
                </p>
            </div>

        </div>
    );
}