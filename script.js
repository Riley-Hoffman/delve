// Namespace Object
const app = {}

// API Method - Taste Dive
app.getSuggestions = function (query) {
    // Pass user's search input into the API
    $.ajax({
        url: `https://tastedive.com/api/similar?q=${query}`,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            info: 1, // allows access to youtube video, and wikipedia link
            k: '421341-FilmDelv-D9ENPAF4'
        }

    })
        .then(result => {
            console.log("result", result)
            // Variable to contain the data nested in Similar.Results in the data returned by the API
            const queryResults = result.Similar.Results
            // // Clear any existing body content on the page
            $('.results').empty()
            // // clear the search input
            $('#search-input').val('')
            // // clear the header content
            $('.headerContent').empty()

            // // Variable containing the users search in a heading to present suggestions
            const resultsHeading = `<h3> For more like <span class="capitalize">${query}</span>, try:</h3>`
            console.log('Input for Heading', resultsHeading)
            // // Remove header height
            $('header').removeClass("tallHeader");
            // // append the heading to the page
            $('.results').append(resultsHeading)
            // Pass the API results to displayResults
            console.log('queryResults', queryResults)
            app.displayResults(queryResults)
        })
}


// DISPLAY RESULTS FUNCTION
app.displayResults = function (films) { // synt
    console.log("films", films)


    if ($(films).length < 1) {
        // Variable containing html that will display on the page using if no results are found. 
        const noResults = ` 
            <h3 class="noResults noResultsMargin">We're sorry the item you were looking for cannot by found.</h3>
            <h4 class="noResults"><i class="far fa-lightbulb"></i>Make sure you're entering the exact title!</h4>
            <p class="noResults noResultsMargin italic">Some items have been released under multiple titles.</p>
            `
        console.log('No results', noResults)
        // Replace the html on the page with noResults message 
        $('.results').html(noResults)
    } else {
        // forEach loop to get individual results
        films.forEach(singleFilm => {
            console.log("film", singleFilm)

            // Variable containing html that will display on the page for each suggestions
            const resultsHtml = `
            <div class="resultBox">
                <div class="resultHeaderBox">
                    <a href="${singleFilm.wUrl}"><h2>${singleFilm.Name}</h2></a><i class="fas fa-external-link-alt"></i>
                </div>
                    <iframe width="320" height="180" src="${singleFilm.yUrl}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
                    <p>${singleFilm.wTeaser}</p>
            </div>
            `
            console.log('resultsHTML', resultsHtml)

            // append the suggestions html to the page
            $('.results').append(resultsHtml);
        })
    }
}



// INITIALIZER METHOD
app.init = () => {
    // Listen for form submission
    $('form').on('submit', function (e) {
        // Prevent page refresh on form submission
        e.preventDefault();
        // Get the users search input
        const userSearch = $('#search-input').val()
        console.log(userSearch)
        // Pass userSearch to getSuggestions and call it
        app.getSuggestions(userSearch)
    })
}

// DOCUMENT READY
$(function () {
    app.init()
});




