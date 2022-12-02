export { validate, validateCoverImages, validateDateFormat, validateDescriptions, validateGenres, validateNoUnderscore, validateSiteLinks, validateStudioProducer, validateSynonyms, validateTags, validateTitles };
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function isUrlUnknown(url) {
	return url === "#" ? "disabled" : "";
}

// Take links that just Official Site, Youtube, Blibli, and Netflix
function validateSiteLinks(links) {
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

function validateCoverImages({ extraLarge, large, medium, color }) {
	return extraLarge ?? large ?? medium ?? color ?? "https://via.placeholder.com/300x450.png?text=No+Image";
}

function validateTitles({ english, romaji, native }) {
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

function validateNoUnderscore(data) {
	return data ? data.split("_").join(" ") : "unknown";
}

function validateSynonyms(synonyms) {
	return synonyms ? synonyms.map((synonym) => synonym).join(`<span class="font-extrabold"> || </span>`) : "unknown";
}

function validate(data) {
	return data ?? "unknown";
}

function validateTags(tags) {
	return tags.length ? tags.map((tag) => tag.name).join(", ") : "unknown";
}
