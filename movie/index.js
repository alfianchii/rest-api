// Import
/* 
note: I can't instance this Utilities into a 
variable because it will be undefined.
So I have to use the prototype to call 
the function. PLEASE HELPPP TwT
*/
import Utilities from "../module/utilities.js";

// DOM elements
const movieList = document.getElementById("movie-list");
const toastContent = document.getElementById("liveToast");
const toastButton = document.getElementById("liveToastBtn");
const headerContent = document.getElementById("header-content-movie");
const paginationBtn = document.querySelector(".pagination");
const inputMovie = document.querySelector("#input-keyword-movie");

// When search button on click
document.querySelector("#search-button-movie").addEventListener("click", function () {
	getAndShowMovie();
});

// When click enter on search input
document.querySelector("#input-keyword-movie").addEventListener("keyup", function (e) {
	if (e.key === "Enter") {
		getAndShowMovie();
	}
});

/*
Cores function: get and show movie
*/
async function getAndShowMovie() {
	try {
		const keyword = Utilities.prototype.inputKeyword(inputMovie.value, "movie", headerContent, movieList, paginationBtn);

		Utilities.prototype.spinner(headerContent, movieList, paginationBtn);

		// const keyword = document.querySelector("#input-keyword-movie").value;
		const movies = await getMovie(keyword);
		updateUI(movies);
	} catch (error) {
		Utilities.prototype.toastClick(toastContent, toastButton, error);
	}
}

async function getMovie(keyword) {
	return await fetch(`https://www.omdbapi.com/?apikey=9da156cc&s=${keyword}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then(async (response) => {
			if (response.Response === "False") {
				if (response.Error === "Movie not found!") {
					Utilities.prototype.fade(movieList);
					movieList.innerHTML = "";
					headerContent.innerHTML = `<h4 class="text-center">Movie not found :(`;
					throw new Error("The movie you are looking for was not found. Please search for something else :3");
				} else if (response.Error === "Too many results.") {
					Utilities.prototype.fade(movieList);
					movieList.innerHTML = "";
					headerContent.innerHTML = `<h4 class="text-center">Too many results :(`;
					throw new Error("Too many results. Please search for something else :3");
				}
				throw new Error(response.Error);
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
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((response) => {
				if (response.Response === "False") {
					throw new Error(response.Error);
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
		content += `<div class="col-12 col-lg-4 col-md-6">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title">${mv.Title}</h4>
							<img src="${mv.Poster}" alt="${mv.Title}" class="img-fluid w-100">
							<h6 class="font-extrabold my-3">${mv.Year}</h6>
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
														<li class="list-group-item">Released: ${mv.Released}</li>
														<li class="list-group-item">Runtime: ${mv.Runtime}</li>
														<li class="list-group-item">Type: ${mv.Type}</li>
														<li class="list-group-item">Genre: ${mv.Genre}</li>
														<li class="list-group-item">Director: ${mv.Director}</li>
														<li class="list-group-item">Writer: ${mv.Writer}</li>
														<li class="list-group-item">Actors: ${mv.Actors}</li>
														<li class="list-group-item">Language: ${mv.Language}</li>
														<li class="list-group-item">Country: ${mv.Country}</li>
														<li class="list-group-item">Plot: ${mv.Plot}</li>
														<li class="list-group-item">Rating: ${mv.imdbRating} (based on IMDB's rating)</li>
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
