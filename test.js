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
