import { useRef } from "react";

export default function Answers({ answers, answerState, userAnswers, onSelect }) {
	const shuffledAnswers = useRef();

	if (!shuffledAnswers.current) {
		shuffledAnswers.current = [...answers];
		shuffledAnswers.current.sort(() => Math.random() - 0.5);
	}

	return (
		<ul id="answers">
			{shuffledAnswers.current.map((answer) => {
				let cssClass = "";
				if (answerState === "answered" && answer === userAnswers[userAnswers.length - 1]) {
					cssClass = "selected";
				}

				if ((answerState === "correct" || answerState === "wrong") && answer === userAnswers[userAnswers.length - 1]) {
					cssClass = answerState;
				}

				return (
					<li key={answer} className="answer">
						<button onClick={() => onSelect(answer)} className={cssClass}>
							{answer}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
