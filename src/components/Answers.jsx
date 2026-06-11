import { useRef } from "react";

export default function Answers({ answers, answerState, selectedAnswer, onSelect }) {
	const shuffledAnswers = useRef();

	if (!shuffledAnswers.current) {
		shuffledAnswers.current = [...answers];
		shuffledAnswers.current.sort(() => Math.random() - 0.5);
	}

	return (
		<ul id="answers">
			{shuffledAnswers.current.map((answer) => {
				let cssClass = "";
				if (answerState === "answered" && answer === selectedAnswer) {
					cssClass = "selected";
				}

				if ((answerState === "correct" || answerState === "wrong") && answer === selectedAnswer) {
					cssClass = answerState;
				}

				return (
					<li key={answer} className="answer">
						<button onClick={() => onSelect(answer)} className={cssClass} disabled={selectedAnswer}>
							{answer}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
