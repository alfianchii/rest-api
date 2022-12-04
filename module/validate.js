import Utilities from "./utilities.js";

const Utils = new Utilities();

function isUrlUnknown(url) {
	return url === "#" ? "disabled" : "";
}

const Validate = {
	validate: (data) => {
		return data ?? "N/A";
	},

	// Take links that just Official Site, Youtube, Blibli, and Netflix
	siteLinks: (links) => {
		// Just Official Site, Youtube, Blibli, and Netflix
		let newLinks = links.reduce((acc, link) => {
			if (link.site === "Official Site" || link.site === "Youtube" || link.site === "Bilibili TV" || link.site === "Netflix") {
				acc.push(link);
			}
			return acc;
		}, []);

		// Validate if there is no link
		newLinks = newLinks.length > 0 ? newLinks : [{ site: "N/A", url: "#" }];

		// Concatenate all links
		return (links = newLinks
			.map(({ site, url }) => {
				return `<a href="${url}" target="_blank" class="btn btn-sm btn-primary me-2 d-inline-block ${isUrlUnknown(url)}">${site}</a>`;
			})
			.join(""));
	},

	dateFormat: ({ day, month, year }) => {
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		day = day ?? "";

		month = months[month - 1] ?? "";

		year = year ?? "";

		return [day, month, year];
	},

	descriptions: (desc) => {
		const noBR = desc ? desc.replace("<br>", "").replace("<br><br>", "<br>").replace("(", "[").replace(")", "]") : "N/A";
		return noBR;
	},

	coverImages: ({ extraLarge, large, medium, color }) => {
		return extraLarge ?? large ?? medium ?? color ?? "https://via.placeholder.com/300x450.png?text=No+Image";
	},

	titles: ({ english, romaji, native }) => {
		english = english ?? "NO 'EN' TITLE";
		romaji = romaji ?? "NO 'ROMAJI' TITLE";
		native = native ?? "NO 'JP' TITLE";
		return [english, romaji, native];
	},

	genres: (genres) => {
		return genres.length ? genres.join(", ") : "N/A";
	},

	studioProducer: (studioProducer) => {
		return studioProducer?.name ?? "N/A";
	},

	noUnderscore: (data) => {
		return data ? data.split("_").join(" ") : "N/A";
	},

	synonyms: (synonyms) => {
		return synonyms.length ? synonyms.map((synonym) => synonym).join(`<span class="font-extrabold"> || </span>`) : "N/A";
	},

	tags: (tags) => {
		return tags.length ? tags.map((tag) => tag.name).join(", ") : "N/A";
	},

	anime: (data, header, list) => {
		if (data.media.length === 0) {
			Utils.fade(header);
			list.innerHTML = "";
			header.innerHTML = `<h4 class="text-center">Anime not found :(</h4>`;
			throw new Error("The anime you are looking for was not found. Please search for something else :3");
		}

		return data;
	},
};

export default Validate;
