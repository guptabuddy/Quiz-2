import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeout, timeout }) {
	const [remainingTime, setRemainingTime] = useState(10000);

	useEffect(() => {
		console.log("Timer started");
		const timerId = setTimeout(() => {
			onTimeout(null);
		}, timeout);

		return () => {
			clearTimeout(timerId);
		};
	}, [timeout, onTimeout]);

	useEffect(() => {
		console.log("Interval started");
		const intervalId = setInterval(() => {
			setRemainingTime((prevTime) => prevTime - 100);
		}, 100);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return <progress id="question-time" value={remainingTime} max={timeout}></progress>;
}
