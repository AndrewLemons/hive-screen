import mitt from "mitt";
import { minuteCallback } from "./time";

export const emitter = mitt();
export const MINUTE_EVENT = "MINUTE_EVENT";

minuteCallback(() => {
	emitter.emit(MINUTE_EVENT);
});

export default emitter;
