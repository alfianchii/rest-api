/*
Utilities function
*/

class Utilities {
	// Input keyword
	inputKeyword(input, type, headerContent, content, paginationBtn) {
		content ? (content.innerHTML = "") : null;
		paginationBtn ? (paginationBtn.innerHTML = "") : null;

		if (input === "") {
			this.fade(headerContent);
			headerContent.innerHTML = `<h4 class="text-center">Type in the ${type} you want to search for first please~!! :></h4>`;
			throw new Error("Input cannot be empty!!>_<");
		}
		return input;
	}

	// Spinner loading
	spinner(headerContent, content, paginationBtn) {
		// Empty the contents
		content.innerHTML = "";
		paginationBtn.innerHTML = "";
		headerContent.innerHTML = "";

		// Add text
		headerContent.innerHTML = `<h4 class="text-center">Searching ...</h4>`;

		// Add spinner
		content.innerHTML = `
            <div class="text-center">
                <div class="spinner-border" style="width: 3rem; height: 3rem" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
	}

	// Fade in and out
	fade(element) {
		element.style.opacity = 0;
		setTimeout(function () {
			element.style.opacity = 1;
		}, 150);
	}

	// Toast click
	toastClick(toastContent, toastButton, error) {
		toastContent.innerHTML = `
		<div class="toast-header">
			<svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
				<rect width="100%" height="100%" fill="#007aff"></rect>
			</svg>
			<strong class="me-auto">Announcement</strong>
			<!-- <small>11 mins ago</small> -->
			<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
		</div>
		<div class="toast-body">${error}</div>`;
		toastButton.click();
	}
}

export default Utilities;
