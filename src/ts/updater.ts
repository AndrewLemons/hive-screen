import { emitter, QUARTER_EVENT } from "./events";

let lastVersion: string | null = null;

function fetchVersion() {
	fetch("./version.json")
		.then((response) => response.json())
		.then((data) => {
			if (!lastVersion) {
				lastVersion = data.version;
			} else if (lastVersion !== data.version) {
				window.location.reload();
			}
		});
}

emitter.on(QUARTER_EVENT, ({ minute, hour }) => {
	// Fetch the version every quarter hour
	fetchVersion();
});

fetchVersion();
