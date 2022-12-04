// Import utilities
import Utilities from "./utilities.js";
const Utils = new Utilities();

class ErrorHandling {
	// Error handling when the API was experienced weirdness
	handling(header, list, error) {
		// If error was "Movie not found!"
		if (error === "Movie not found!") {
			this.showErrorHandling(header, list, "Movie not found :(", "The movie you are looking for was not found. Please search for something else :3");
		}

		// If error was "Too many results."
		else if (error === "Too many results.") {
			this.showErrorHandling(header, list, "Too many results :(", "Too many results; please search for something else :3");
		}
		// If error was "No API key provided."
		else if (error === "No API key provided.") {
			this.showErrorHandling(header, list, "No API key provided :(", "No API key provided; please contact the developer :3");
		}

		// If error was "Invalid API key!"
		else if (error === "Invalid API key!") {
			this.showErrorHandling(header, list, "Invalid API key :(", "Invalid API key; please contact the developer :3");
		}

		// If error was "Request limit reached!"
		else if (error === "Request limit reached!") {
			this.showErrorHandling(header, list, "Request limit reached :(", "Request limit reached; please try again after 24 hours :3");
		}

		// If error was "Something went wrong."
		else if (error === "Something went wrong.") {
			this.showErrorHandling(header, list, "Something went wrong :(", "Something went wrong; please try again later :3");
		}

		// If error was "Service unavailable."
		else if (error === "Service unavailable.") {
			this.showErrorHandling(header, list, "Service unavailable :(", "Service unavailable; please try again later :3");
		}

		// If error was "Incorrect IMDb ID."
		else if (error === "Incorrect IMDb ID.") {
			this.showErrorHandling(header, list, "Incorrect IMDb ID :(", "Incorrect IMDb ID or input search; please check your input or the fetch url :3");
		}

		// If error was "Internal server error."
		else if (error === "Internal server error.") {
			this.showErrorHandling(header, list, "Internal server error :(", "Internal server error; please try again later :3");
		}

		// If error was "Something bad happened."
		else if (error === "Something bad happened.") {
			this.showErrorHandling(header, list, "Something bad happened :(", "Something bad happened; please try again later :3");
		}

		// If error was "The resource you requested could not be found."
		else if (error === "The resource you requested could not be found.") {
			this.showErrorHandling(header, list, "The resource you requested could not be found :(", "The resource you requested could not be found; please contact the developer :3");
		}

		// If error was "The requested resource does not exist."
		else if (error === "The requested resource does not exist.") {
			this.showErrorHandling(header, list, "The requested resource does not exist :(", "The requested resource does not exist; please contact the developer :3");
		}

		// If error was "Invalid parameters."
		else if (error === "Invalid parameters.") {
			this.showErrorHandling(header, list, "Invalid parameters :(", "Invalid parameters; please contact the developer :3");
		}

		// If error was "No query term provided."
		else if (error === "No query or mutation provided. Please view https://anilist.co/graphiql to see available queries and mutations.") {
			this.showErrorHandling(header, list, "No query or mutation provided :(", "No query or mutation provided; please contact the developer :3");
		}

		throw new Error(error);
	}

	// Show error message with Toast
	showErrorHandling(header, list, message, error) {
		Utils.fade(list);
		list.innerHTML = "";
		header.innerHTML = `<h4 class="text-center">${message}</h4>`;
		throw new Error(error);
	}
}

// export default ErrorHandling;
export default ErrorHandling;
