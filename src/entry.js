import Rx from 'rx';
import { Show, InputEvent, EventToValue } from "./util.js";

let event1 = InputEvent(document.getElementById("txt1"))
	.map(EventToValue)
	.map(parseInt);

let event2 = InputEvent(document.getElementById("txt2"))
	.map(EventToValue)
	.map(parseInt);

event1
	.combineLatest(event2, (num1, num2) => {
		return num1 + num2;
	})
	.subscribe(Show);
