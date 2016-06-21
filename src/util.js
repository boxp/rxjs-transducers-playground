import Rx from 'rx';

function Show(x) {
	let elm = document.getElementById("screen");

	elm.innerHTML = x;
}

function InputEvent(elm) {
	return Rx.Observable.fromEvent(elm, 'input')
}

function EventToValue(e) {
	return e.target.value
}

export { Show, InputEvent, EventToValue };
