import mitt from "mitt";
import Time from "./time";

export const MINUTE_EVENT = "MINUTE_EVENT";
export const QUARTER_EVENT = "QUARTER_EVENT";
export const HOUR_EVENT = "HOUR_EVENT";

type Events = {
	[MINUTE_EVENT]: { minute: number; hour: number };
	[QUARTER_EVENT]: { minute: number; hour: number };
	[HOUR_EVENT]: number;
};

export const emitter = mitt<Events>();

const time = new Time();

time.setMinuteCallback((minute, hour) => {
	emitter.emit(MINUTE_EVENT, { minute, hour });
});
time.setQuarterCallback((minute, hour) => {
	emitter.emit(QUARTER_EVENT, { minute, hour });
});
time.setHourCallback((hour) => {
	emitter.emit(HOUR_EVENT, hour);
});

time.start();

export default emitter;
