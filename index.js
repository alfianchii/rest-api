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
		console.log(error);
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
	// console.log(obj);

	headerContent.innerHTML = `<h4 class="mb-5 text-center">Search result of '${searchBtn.value}' :</h4>`;

	let content = "";

	obj.forEach(
		({
			title,
			coverImage,
			startDate,
			id,
			studios: {
				nodes: [studio1],
			},
			duration,
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
			const animeId = id;

			// Validate language title and set it to romaji if it's not available in english. If it's not available in romaji, set it to native.
			const [englishTitle, romajiTitle, nativeTitle] = validateTitle(title);

			// Validate if the anime have no a cover image
			const cover = validateCoverImage(coverImage);

			// Validate description if null/undefined and remove the source
			let desc = validateDescriptions(description);
			console.log(desc);

			// Validate released date if null/undefined
			const [day, month, year] = validateDateFormat(startDate);

			// Validate format if null/undefined
			const type = validateType(format);

			// Validate genres if null/undefined
			const genre = validateGenres(genres);

			// Validate studio if null/undefined
			const studioProducer = validateStudioProducer(studio1);

			// Validate status if null/undefined and seperate it to 2 words (no underscore)
			const stat = validateStatus(status);

			// Validate episodes if null/undefined
			const episode = validate(episodes);

			// Validate duration if null/undefined
			const time = validate(duration);

			// Validate the links that just Official Site, Youtube, Blibli, and Netflix
			const externalLink = siteLinks(externalLinks);

			// Validate synonyms if null/undefined
			const synonym = validateSynonyms(synonyms);

			content += `
				<div class="col-12 col-lg-4 col-md-6 mb-5">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title mb-4">${englishTitle !== "NO 'EN' TITLE" ? englishTitle : romajiTitle ? romajiTitle : nativeTitle}</h4>
							<img src="${cover}" alt="${englishTitle !== "NO 'EN' TITLE" ? englishTitle : romajiTitle ? romajiTitle : nativeTitle}" class="rounded img-fluid w-100">
							<h5 class="font-extrabold my-3">${year}</h5>
							<div class="modal-primary me-1 mb-1 d-inline-block">
								<!-- Button trigger for primary themes modal -->
								<button type="button" class="btn btn-primary" data-bs-toggle="modal"
									data-bs-target="#anime${animeId}">
									Detail
								</button>
								<!--primary theme Modal -->
								<div class="modal fade text-left" id="anime${animeId}" tabindex="-1" role="dialog"
									aria-labelledby="myModalLabel160" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
										role="document">
										<div class="modal-content">
											<div class="modal-header bg-primary">
												<div class="d-xl-flex justify-content-xl-around w-100 text-center">
													<div>
														<h5 class="modal-title white" id="myModalLabel160">${englishTitle}</h5>
													</div>
													<div>
														<h5 class="modal-title white">${romajiTitle}</h5>
													</div>
													<div>
														<h5 class="modal-title white">${nativeTitle}</h5>
													</div>
												</div>
												
												<!-- <button type="button" class="close" data-bs-dismiss="modal"
													aria-label="Close">
													<i data-feather="x"></i>
												</button> -->
											</div>
											<div class="modal-body">
												<div class="row">
													<div class="col-12 col-xl-5 mb-3">
														<img class="rounded img-fluid mx-auto d-block" src="${cover}" alt="${englishTitle}" />
													</div>

													<div class="col-12 col-xl-7">
														<ul class="list-group w-100">
															<li class="list-group-item"><span class="font-extrabold">Synonym:</span> ${synonym}</li>
															<li class="list-group-item"><span class="font-extrabold">Description:</span> ${desc}</li>
															<li class="list-group-item"><span class="font-extrabold">Released:</span> ${day} ${month} ${year}</li>
															<li class="list-group-item"><span class="font-extrabold">Studio:</span> ${studioProducer}</li>
															<li class="list-group-item"><span class="font-extrabold">Type:</span> ${type}</li>
															<li class="list-group-item"><span class="font-extrabold">Status:</span> ${stat}</li>
															<li class="list-group-item"><span class="font-extrabold">Genre:</span> ${genre}</li>
															<li class="list-group-item"><span class="font-extrabold">Episode:</span> ${episode} episode(s)</li>
															<li class="list-group-item"><span class="font-extrabold">Duration:</span> ${time} minute(s)</li>
															<li class="list-group-item"><span class="font-extrabold me-1">Site:</span> 
																${externalLink}
															</li>
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

/*
Utilities function
*/
function isUrlUnknown(url) {
	return url === "#" ? "disabled" : "";
}

// Take links that just Official Site, Youtube, Blibli, and Netflix
function siteLinks(links) {
	// Just Official Site, Youtube, Blibli, and Netflix
	let newLinks = links.reduce((acc, link) => {
		if (link.site === "Official Site" || link.site === "Youtube" || link.site === "Bilibili TV" || link.site === "Netflix") {
			acc.push(link);
		}
		return acc;
	}, []);

	// Validate if there is no link
	newLinks = newLinks.length > 0 ? newLinks : [{ site: "unknown", url: "#" }];

	// Concatenate all links
	return (links = newLinks
		.map(({ site, url }) => {
			return `<a href="${url}" target="_blank" class="btn btn-sm btn-primary me-2 d-inline-block ${isUrlUnknown(url)}">${site}</a>`;
		})
		.join(""));
}

function validateDateFormat({ day, month, year }) {
	day = day ?? "";

	month = months[month - 1] ?? "";

	year = year ?? "";

	return [day, month, year];
}

function validateDescriptions(desc) {
	const noBR = desc ? desc.replace("<br>", "").replace("<br><br>", "<br>").replace("(", "[").replace(")", "]") : "unknown";
	return noBR;
}

function validateCoverImage({ extraLarge, large, medium, color }) {
	// const link = "https://via.placeholder.com/300x450.png?text=No+Image";
	// extraLarge = extraLarge ?? link;
	// large = large ?? link;
	// medium = medium ?? link;
	// color = color ?? link;
	// return [extraLarge, large, medium, color];
	return extraLarge ?? large ?? medium ?? color ?? "https://via.placeholder.com/300x450.png?text=No+Image";
}

function validateTitle({ english, romaji, native }) {
	english = english ?? "NO 'EN' TITLE";
	romaji = romaji ?? "NO 'ROMAJI' TITLE";
	native = native ?? "NO 'JP' TITLE";
	return [english, romaji, native];
}

function validateGenres(genres) {
	return genres ? genres.join(", ") : "unknown";
}

function validateStudioProducer(studioProducer) {
	return studioProducer?.name ?? "unknown";
}

function validateStatus(status) {
	return status ? status.toLowerCase().split("_").join(" ") : "unknown";
}

function validateType(type) {
	return type ? type.toLowerCase().split("_").join(" ") : "unknown";
}

function validateSynonyms(synonyms) {
	return synonyms ? synonyms.map((synonym) => synonym).join(`<span class="font-extrabold"> || </span>`) : "unknown";
}

function validate(data) {
	return data ?? "unknown";
}

function validateTags(tags) {
	return tags ? tags.map((tag) => tag.name).join(", ") : "unknown";
}
