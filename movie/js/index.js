/* 
note: I can't instance this Utilities into a 
variable because it will be undefined.
So I have to use the prototype to call 
the function. PLEASE HELPPP TwT
*/

// Importing Utilities
import Utilities from "../../module/utilities.js";

// DOM elements
const movieList = document.getElementById("movie-list");
const toastContent = document.getElementById("liveToast");
const toastButton = document.getElementById("liveToastBtn");
const headerContent = document.getElementById("header-content-movie");
const paginationBtn = document.querySelector(".pagination");
const inputMovie = document.querySelector("#input-keyword-movie");

// When search button on click
document.querySelector("#search-button-movie").addEventListener("click", function () {
	// Get and show movie
	getAndShowMovie();
});

// When click enter on search input
document.querySelector("#input-keyword-movie").addEventListener("keyup", function (e) {
	if (e.key === "Enter") {
		// Get and show movie
		getAndShowMovie();
	}
});

/*
Cores function: get and show movie
*/

// Get and show movie
async function getAndShowMovie() {
	try {
		// Get search keyword then validate it
		const keyword = Utilities.prototype.inputKeyword(inputMovie.value, "movie", headerContent, movieList, paginationBtn);

		// Run spinner
		Utilities.prototype.spinner(headerContent, movieList, paginationBtn);

		// Get movies
		const movies = await getMovie(keyword);

		// Then update the UI
		updateUI(movies);
	} catch (error) {
		// Show error message with Toast
		Utilities.prototype.toastClick(toastContent, toastButton, error);
	}
}

// Get movie
async function getMovie(keyword) {
	return await fetch(`https://www.omdbapi.com/?apikey=9da156cc&s=${keyword}`)
		.then((response) => response.json())
		.then(async (response) => {
			// If the response was false
			if (response.Response === "False") {
				errorHandling(headerContent, movieList, response.Error);
			}

			let movies = response.Search;

			let imdbID = movies.map((movie) => {
				return movie.imdbID;
			});

			const movieDetails = await getMovieDetail(imdbID);

			return movieDetails;
		});
}

async function getMovieDetail(imdbID) {
	let movieDetails = await imdbID.map(async (id) => {
		return await fetch(`https://www.omdbapi.com/?apikey=9da156cc&i=${id}`)
			.then((response) => response.json())
			.then((response) => {
				if (response.Response === "False") {
					errorHandling(headerContent, movieList, response.Error);
				}
				return response;
			});
	});

	movieDetails = await Promise.all(movieDetails).then((r) => r);

	return movieDetails;
}

function updateUI(movieDetails) {
	// Header content
	headerContent.innerHTML = `
	<h4 class="text-center">Search result of '${inputMovie.value}' :</h4>`;

	let content = "";
	movieDetails.forEach((mv) => {
		content += `
				<div class="col-12 col-lg-4 col-md-6 mb-5">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title mb-4">${mv.Title}</h4>
							<hr>
							<img src="${mv.Poster}" alt="${mv.Title}" class="img-fluid w-100">
							<h5 class="font-extrabold my-3">${mv.Year}</h5>
							<div class="modal-primary me-1 mb-1 d-inline-block">
								<!-- Button trigger for primary themes modal -->
								<button type="button" class="btn btn-primary" data-bs-toggle="modal"
									data-bs-target="#${mv.imdbID}">
									Detail
								</button>
								<!--primary theme Modal -->
								<div class="modal fade text-left" id="${mv.imdbID}" tabindex="-1" role="dialog"
									aria-labelledby="myModalLabel160" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
										role="document">
										<div class="modal-content">
											<div class="modal-header bg-primary">
												<h5 class="modal-title white" id="myModalLabel160">
													${mv.Title}
												</h5>
												<button type="button" class="close" data-bs-dismiss="modal"
													aria-label="Close">
													<i data-feather="x"></i>
												</button>
											</div>
											<div class="modal-body">
												<div class="d-lg-flex">
													<div class="pe-3 text-center mb-3">
														<img src="${mv.Poster}" alt="">
													</div>
													<ul class="list-group w-100">
														<li class="list-group-item"><span class="font-extrabold">Released: </span>${mv.Released}</li>
														<li class="list-group-item"><span class="font-extrabold">Runtime: </span>${mv.Runtime}</li>
														<li class="list-group-item"><span class="font-extrabold">Type: </span>${mv.Type}</li>
														<li class="list-group-item"><span class="font-extrabold">Genre: </span>${mv.Genre}</li>
														<li class="list-group-item"><span class="font-extrabold">Director: </span>${mv.Director}</li>
														<li class="list-group-item"><span class="font-extrabold">Writer: </span>${mv.Writer}</li>
														<li class="list-group-item"><span class="font-extrabold">Actors: </span>${mv.Actors}</li>
														<li class="list-group-item"><span class="font-extrabold">Language: </span>${mv.Language}</li>
														<li class="list-group-item"><span class="font-extrabold">Country: </span>${mv.Country}</li>
														<li class="list-group-item"><span class="font-extrabold">Plot: </span>${mv.Plot}</li>
														<li class="list-group-item"><span class="font-extrabold">Rating: </span>${mv.imdbRating} (based on IMDB's rating)</li>
													</ul>
												</div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-outline-light"
													data-bs-dismiss="modal">
													<span class="d-sm-block">Close</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>`;
	});

	movieList.innerHTML = content;
}

// Error handling when the API was experienced weirdness
function errorHandling(header, list, error) {
	// If error was "Movie not found!"
	if (error === "Movie not found!") {
		showErrorHandling(header, list, "Movie not found :(", "The movie you are looking for was not found. Please search for something else :3");
	}

	// If error was "Too many results."
	else if (error === "Too many results.") {
		showErrorHandling(header, list, "Too many results :(", "Too many results; please search for something else :3");
	}

	// If error was "No API key provided."
	else if (error === "No API key provided.") {
		showErrorHandling(header, list, "No API key provided :(", "No API key provided; please contact the developer :3");
	}

	// If error was "Invalid API key!"
	else if (error === "Invalid API key!") {
		showErrorHandling(header, list, "Invalid API key :(", "Invalid API key; please contact the developer :3");
	}

	// If error was "Request limit reached!"
	else if (error === "Request limit reached!") {
		showErrorHandling(header, list, "Request limit reached :(", "Request limit reached; please try again after 24 hours :3");
	}

	// If error was "Something went wrong."
	else if (error === "Something went wrong.") {
		showErrorHandling(header, list, "Something went wrong :(", "Something went wrong; please try again later :3");
	}

	// If error was "Service unavailable."
	else if (error === "Service unavailable.") {
		showErrorHandling(header, list, "Service unavailable :(", "Service unavailable; please try again later :3");
	}

	// If error was "Incorrect IMDb ID."
	else if (error === "Incorrect IMDb ID.") {
		showErrorHandling(header, list, "Incorrect IMDb ID :(", "Incorrect IMDb ID or input search; please check your input or the fetch url :3");
	}

	// If error was "Internal server error."
	else if (error === "Internal server error.") {
		showErrorHandling(header, list, "Internal server error :(", "Internal server error; please try again later :3");
	}
	// If error was "Something bad happened."
	else if (error === "Something bad happened.") {
		showErrorHandling(header, list, "Something bad happened :(", "Something bad happened; please try again later :3");
	}
	// If error was "The resource you requested could not be found."
	else if (error === "The resource you requested could not be found.") {
		showErrorHandling(header, list, "The resource you requested could not be found :(", "The resource you requested could not be found; please contact the developer :3");
	}
	// If error was "The requested resource does not exist."
	else if (error === "The requested resource does not exist.") {
		showErrorHandling(header, list, "The requested resource does not exist :(", "The requested resource does not exist; please contact the developer :3");
	}
	// If error was "Invalid parameters."
	else if (error === "Invalid parameters.") {
		showErrorHandling(header, list, "Invalid parameters :(", "Invalid parameters; please contact the developer :3");
	}

	throw new Error(error);
}

// Show error message with Toast
function showErrorHandling(header, list, message, error) {
	Utilities.prototype.fade(list);
	list.innerHTML = "";
	header.innerHTML = `<h4 class="text-center">${message}</h4>`;
	throw new Error(error);
}
