// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const query = `
query ($search: String $page: Int, $perPage: Int, $id: Int) { # Define which variables will be used in the query (id)
	Page (page: $page, perPage: $perPage) {
		pageInfo {
		  total
		  currentPage
		  lastPage
		  hasNextPage
		  perPage
		}
		
		media (id: $id, search: $search, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
			id
			title {
			  romaji
			  english
			  native
			}
			type 
			description
			startDate {
				year
				month
				day
			}
			duration
			season
			episodes
			chapters
			status
			bannerImage
			genres
			synonyms
			averageScore
			coverImage {
				extraLarge
				large
				medium
				color
			}
			tags {
				name
				description
				category
				rank
			}
			studios {
				nodes {
					name
					siteUrl
				}
			}
			externalLinks {
				url
				site
			}
			format
		}
	}
}
`;

// Define our query variables and values that will be used in the query request
let searchBtn = document.getElementById("input-keyword");
let animeList = document.getElementById("anime-list");
let headerContent = document.querySelector("#header-content");

document.getElementById("search-button").addEventListener("click", async function () {
	getAndShowAnime();
});

async function getAndShowAnime() {
	try {
		const animes = await getAnime(searchBtn.value);
		showAnime(animes.media);
	} catch (error) {
		alert(error);
	}
}

// Get the anime's data
async function getAnime(keyword) {
	// Define the config we'll need for our Api request
	return await fetch(`https://graphql.anilist.co`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			query: query,
			variables: {
				search: keyword,
				page: 1,
				// perPage: 100,
			},
		}),
	})
		// Make the HTTP Api request
		.then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then((response) => {
			return response.data.Page;
		});
}

function showAnime(obj) {
	console.log(obj);

	headerContent.innerHTML = `<h4 class="mb-5 text-center">Search result of '${searchBtn.value}' :</h4>`;

	let content = "";

	obj.forEach(
		({
			title: { romaji, english, native },
			coverImage: { extraLarge, large, medium },
			startDate,
			id,
			studios: {
				nodes: [studio1],
			},
			duration,
			season,
			episodes,
			status,
			genres,
			synonyms,
			averageScore,
			tags,
			description,
			externalLinks,
			format,
		}) => {
			english = english ? english : romaji ? romaji : native;

			extraLarge = extraLarge ? extraLarge : large ? large : medium;

			description = description ? description : "unknown";
			// description = description.split(" ");
			// description = description.slice(description.lastIndexOf(description), 1);
			let str = "<br>(Source";
			let lastDescription = description.lastIndexOf(str);
			description = description.slice(0, lastDescription);
			console.log(description);

			let day = startDate?.day || "";

			let month = startDate?.month || "";
			month = months[month - 1] || "";

			let year = startDate?.year || "";

			format = format.split("_").join(" ");

			genres = genres.join(", ");

			studio1 = studio1?.name || "unknown";

			status = status.toLowerCase().split("_").join(" ");

			episodes = episodes || "unknown";

			duration = duration || "unknown";

			const newLinks = externalLinks.reduce((acc, link) => {
				if (link.site === "Official Site" || link.site === "Youtube" || link.site === "Bilibili TV" || link.site === "Netflix") {
					acc.push(link);
				}
				return acc;
			}, []);

			content += `
				<div class="col-12 col-lg-4 col-md-6 mb-5">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title mb-4">${english}</h4>
							<img src="${extraLarge}" alt="${romaji}" class="rounded img-fluid w-100">
							<h5 class="font-extrabold my-3">${year}</h5>
							<div class="modal-primary me-1 mb-1 d-inline-block">
								<!-- Button trigger for primary themes modal -->
								<button type="button" class="btn btn-primary" data-bs-toggle="modal"
									data-bs-target="#anime${id}">
									Detail
								</button>
								<!--primary theme Modal -->
								<div class="modal fade text-left" id="anime${id}" tabindex="-1" role="dialog"
									aria-labelledby="myModalLabel160" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
										role="document">
										<div class="modal-content">
											<div class="modal-header bg-primary">
												<div class="d-xl-flex justify-content-xl-around w-100 text-center">
													<div>
														<h5 class="modal-title white" id="myModalLabel160">${english}</h5>
													</div>
													<div>
														<h5 class="modal-title white">${romaji}</h5>
													</div>
													<div>
														<h5 class="modal-title white">${native}</h5>
													</div>
												</div>
												
												<button type="button" class="close" data-bs-dismiss="modal"
													aria-label="Close">
													<i data-feather="x"></i>
												</button>
											</div>
											<div class="modal-body">
												<div class="row">
													<div class="col-12 col-xl-5 mb-3">
														<img class="rounded img-fluid mx-auto d-block" src="${extraLarge}" alt="${romaji}" />
													</div>

													<div class="col-12 col-xl-7">
														<ul class="list-group w-100">
															<li class="list-group-item"><span class="font-bold">Description</span>: ${description}</li>
															<li class="list-group-item"><span class="font-bold">Released: ${day} ${month} ${year}</li>
															<li class="list-group-item"><span class="font-bold">Type</span>: ${format}</li>
															<li class="list-group-item"><span class="font-bold">Genre</span>: ${genres}</li>
															<li class="list-group-item"><span class="font-bold">Studio</span>: ${studio1}</li>
															<li class="list-group-item"><span class="font-bold">Status</span>: ${status}</li>
															<li class="list-group-item"><span class="font-bold">Episode</span>: ${episodes} episode(s)</li>
															<li class="list-group-item"><span class="font-bold">Duration</span>: ${duration} minute(s)</li>
														</ul>
													</div>
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
		},
	);

	animeList.innerHTML = content;
}
