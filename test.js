obj.forEach(
	({
		title: { romaji, english, native },
		coverImage: { extraLarge },
		startDate: { year, month, day },
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
		source,
		externalLinks,
	}) => {
		const newLinks = externalLinks.reduce((acc, link) => {
			if (link.site === "Official Site" || link.site === "Youtube" || link.site === "Bilibili TV" || link.site === "Netflix") {
				acc.push(link);
			}
			return acc;
		}, []);
		console.log(newLinks);
	},
);

content += `
				<div class="col-12 col-lg-4 col-md-6">
					<div class="card">
						<div class="card-body">
							<h4 class="card-title">${romaji}</h4>
							<img src="${extraLarge}" alt="${romaji}" class="img-fluid w-100">
							<h6 class="font-extrabold my-3">${year}</h6>
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
												<h5 class="modal-title white" id="myModalLabel160">
													${romaji}
												</h5>
												<button type="button" class="close" data-bs-dismiss="modal"
													aria-label="Close">
													<i data-feather="x"></i>
												</button>
											</div>
											<div class="modal-body">
												<div class="d-lg-flex">
													<div class="pe-3 text-center mb-3">
														<img src="${extraLarge}" alt="${romaji}">
													</div>
													<ul class="list-group w-100">
														<li class="list-group-item">Released: ${day} ${month} ${year}</li>
														<li class="list-group-item">Studio: ${studio1}</li>
														<li class="list-group-item">Status: ${status}</li>
														<li class="list-group-item">Episode(s): ${episodes} minute(s)</li>
														<li class="list-group-item">Duration: ${duration} minute(s)</li>
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

				newLinks
																				.map((link) => {
																					return `<a href="${link.url}" target="_blank" class="btn btn-sm btn-primary me-2 d-inline-block">${link.site}</a>`;
																				})
																				.join("")

// Validate language title and set it to romaji if it's not available in english. If it's not available in romaji, set it to native.
english = english ? english : romaji ? romaji : native ? native : "unknown";

// Validate if the anime has a cover image
extraLarge = extraLarge ? extraLarge : large ? large : medium ? medium : "unknown";

// Validate format if null/undefined
format = format.split("_").join(" ");

// Validate genres if null/undefined
genres = genres.join(", ");

// Validate studio if null/undefined
studio1 = studio1?.name || "unknown";

// Validate status if null/undefined and seperate it to 2 words (no underscore)
status = status || "unknown";
status = status.toLowerCase().split("_").join(" ");

// Validate episodes if null/undefined
episodes = episodes || "unknown";

// Validate duration if null/undefined
duration = duration || "unknown";

desc = desc ? desc.search(/<br>/) : "unknown";
return desc > 0 ? desc.slice(0, sourceTextInDescription) : desc;



desc = desc ? desc : "unknown";
let sourceTextInDescription = desc.search(/<br>/);
desc = sourceTextInDescription > 0 ? desc.slice(0, sourceTextInDescription) : desc;

return desc;

let seperateSource = desc ? desc.search("<br><br>") : "unknown";
// let seperateSource = desc ? desc.search(/<br>\/\/<br>/) : "unknown";
return seperateSource > 0 ? desc.slice(0, seperateSource) : desc;

// Validate adaptation if null/undefined and seperate it to 2 words (no underscore)
const adaptation = validateNoUnderscore(source);

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
															<li class="list-group-item"><span class="font-extrabold me-1">Site:</span> ${externalLink}</li>