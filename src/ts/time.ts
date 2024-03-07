export function minuteCallback(callback) {
	const now = new Date();
	const seconds = now.getSeconds();
	const milliseconds = now.getMilliseconds();
	const delay = (60 - seconds) * 1000 - milliseconds;

	setTimeout(() => {
		callback();
		setInterval(callback, 60000);
	}, delay);
}
