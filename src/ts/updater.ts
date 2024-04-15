import { emitter, QUARTER_EVENT } from "./events";

let lastBuild: string | null = null;

function fetchVersion() {
	fetch("./version.json")
		.then((response) => response.json())
		.then((data) => {
			if (!lastBuild) {
				lastBuild = data.buildTime;
			} else if (lastBuild !== data.buildTime) {
				window.location.reload();
			}
		});
}

emitter.on(QUARTER_EVENT, ({ minute, hour }) => {
	// Fetch the version every quarter hour
	fetchVersion();
});

fetchVersion();
