// function showPagination(jumlahHalaman) {
// 	// Pagination
// 	const pagination = document.querySelector(".pagination");
// 	pagination.innerHTML = "";
// 	for (let i = 1; i <= jumlahHalaman; i++) {
// 		pagination.innerHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
// 	}

// 	// Add active class to the first page
// 	pagination.firstElementChild.classList.add("active");

// 	// Add active class to the clicked page
// 	pagination.addEventListener("click", function (e) {
// 		if (e.target.classList.contains("page-link")) {
// 			pagination.querySelector(".active").classList.remove("active");
// 			e.target.parentElement.classList.add("active");
// 		}
// 	});

// 	// Add previous and next button
// 	// pagination.innerHTML = `<li class="page-item"><a class="page-link" href="#">Prev</a></li>` + pagination.innerHTML + `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;
// }

function showAnime(obj) {
	// console.log(obj);

	headerContent.innerHTML = `
		<h4 class="mb-5 text-center">Search result of '${searchBtn.value}' :</h4>

		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-md-3 pe-0 mb-1 mt-1">
								<h4 class="text-center text-md-start">Select per page</h4>
							</div>
							<div class="col-md-9 ps-0 mb-1 mt-1">
								<div class="input-group">
									<select class="form-select" id="select-per-page">
										<option class="per-page" value="3">3</option>
										<option class="per-page" value="5" selected>5</option>
										<option class="per-page" value="10">10</option>
										<option class="per-page" value="15">15</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;

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
			source,
		}) => {
			// Take the anime id
			const animeId = id;

			// Validate language title and set it to romaji if it's not available in english. If it's not available in romaji, set it to native.
			const [englishTitle, romajiTitle, nativeTitle] = validateTitles(title);

			// Validate if the anime have no a cover image
			const cover = validateCoverImages(coverImage);

			// Validate description if null/undefined and remove the source
			const desc = validateDescriptions(description);

			// Validate released date if null/undefined
			const [day, month, year] = validateDateFormat(startDate);

			// Validate format if null/undefined
			const type = validateNoUnderscore(format);

			// Validate genres if null/undefined
			const genre = validateGenres(genres);

			// Validate studio if null/undefined
			const studioProducer = validateStudioProducer(studio1);

			// Validate status if null/undefined and seperate it to 2 words (no underscore)
			const stat = validateNoUnderscore(status);

			// Validate episodes if null/undefined
			const episode = validate(episodes);

			// Validate duration if null/undefined
			const time = validate(duration);

			// Validate the links that just Official Site, Youtube, Blibli, and Netflix
			const externalLink = validateSiteLinks(externalLinks);

			// Validate synonyms if null/undefined
			const synonym = validateSynonyms(synonyms);

			// Validate tags if null/undefined
			const tag = validateTags(tags);

			// Validate adaptation if null/undefined and seperate it to 2 words (no underscore)
			const adaptation = validateNoUnderscore(source);

			// Validate score if null/undefined
			const average = validate(averageScore);

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
															<li class="list-group-item"><span class="font-extrabold">Adaptation:</span> ${adaptation}</li>
															<li class="list-group-item"><span class="font-extrabold">Status:</span> ${stat}</li>
															<li class="list-group-item"><span class="font-extrabold">Genre:</span> ${genre}</li>
															<li class="list-group-item"><span class="font-extrabold">Episode:</span> ${episode} episode(s)</li>
															<li class="list-group-item"><span class="font-extrabold">Duration:</span> ${time} minute(s)</li>
															<li class="list-group-item"><span class="font-extrabold me-1">Tag:</span> ${tag}</li>
															<li class="list-group-item"><span class="font-extrabold me-1">Average Score:</span> ${average}</li>
															<li class="list-group-item"><span class="font-extrabold me-1">Site:</span> ${externalLink}</li>
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

function showPagination(totalData, perPage) {
	paginationBtn.innerHTML = "";
	let pagination = Math.ceil(totalData / perPage);
	let paginationContent = ``;
	for (let i = 1; i <= pagination; i++) {
		paginationContent += `
			<li class="page-item"><a class="page-link ${i === 1 ? "active" : ""}" href="#">${i}</a></li>
		`;
	}
	paginationBtn.innerHTML = paginationContent;
}
