(function() {
	"use strict";

	var images = {
		google: chrome.runtime.getURL("/files/google.jpeg")
	};

	chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			if (details.url.includes("branding/googlelogo")) {
				return { redirectUrl: images.google };
			}
			console.log(details.url);
		},
		{
			urls: chrome.runtime.getManifest()["externally_connectable"].matches
		},
		["blocking"]
	);
})();
