import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeout, timeout, mode }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		console.log("Timer started");
		const timerId = setTimeout(() => {
			onTimeout(null);
		}, timeout);

		return () => {
			clearTimeout(timerId);
		};
	}, [timeout, onTimeout]);

	// When the timeout changes in the parent component, this above effect will be triggered (as the useEffect dependency changes) and the timer will be reset.

	// But in the below useEffect there is no dependency change, there we are just using the state value "remainingTime" to update the progress bar. SO the Interval will not be reset, as useEffect cleanup function only runs when the component is unmounted, or the dependency changes (right before effect runs again).
	// So, we have to remount this whole component from the parent component when the timeout changes, and then the fresh useEffect will run  and the new timeout(timer) will be set.
	// Did that with help of "key" prop (key={timeout}), in parent component (QuestionAnswer).

	useEffect(() => {
		console.log("Interval started");
		const intervalId = setInterval(() => {
			setRemainingTime((prevTime) => prevTime - 100);
		}, 100);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return <progress id="question-time" value={remainingTime} max={timeout} className={mode}></progress>;
}
