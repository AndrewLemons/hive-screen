export default class Time {
	private interval: number;
	private minuteCallback: (minute: number, hour: number) => void;
	private quarterCallback: (minute: number, hour: number) => void;
	private hourCallback: (hour: number) => void;

	constructor() {
		this.interval = 0;
		this.minuteCallback = () => {};
		this.quarterCallback = () => {};
		this.hourCallback = () => {};
	}

	private intervalCallback() {
		const now = new Date();
		const minute = now.getMinutes();
		const hour = now.getHours();

		this.minuteCallback(minute, hour);

		if (minute % 15 === 0) this.quarterCallback(minute, hour);
		if (minute === 0) this.hourCallback(hour);
	}

	/**
	 * Set the callback to be called every minute
	 * @param callback - The callback to be called every minute
	 */
	public setMinuteCallback(callback: (minute: number, hour: number) => void) {
		this.minuteCallback = callback;
	}

	/**
	 * Set the callback to be called every quarter hour
	 * @param callback - The callback to be called every quarter hour
	 */
	public setQuarterCallback(callback: (minute: number, hour: number) => void) {
		this.quarterCallback = callback;
	}

	/**
	 * Set the callback to be called every hour
	 * @param callback - The callback to be called every hour
	 */
	public setHourCallback(callback: (hour: number) => void) {
		this.hourCallback = callback;
	}

	/**
	 * Stop the time
	 */
	public stop() {
		clearInterval(this.interval);
	}

	/**
	 * Start the time
	 */
	public start() {
		this.stop();

		const now = new Date();
		const seconds = now.getSeconds();
		const milliseconds = now.getMilliseconds();
		const delay = (60 - seconds) * 1000 - milliseconds;

		setTimeout(() => {
			this.intervalCallback();
			this.interval = setInterval(() => {
				this.intervalCallback();
			}, 60000);
		}, delay);
	}
}
