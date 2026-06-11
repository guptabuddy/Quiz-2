import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";

import QUESTIONS from "../../questions.js";

export default function QuestionAnswer({ questionIndex, onTimeout, onSelectAnswer }) {
	const [answer, setAnswer] = useState({
		selectedAnswer: "",
		isCorrect: null,
	});

	function handleSelectAnswer(answer) {
		setAnswer({ selectedAnswer: answer, isCorrect: null });

		setTimeout(() => {
			setAnswer({ selectedAnswer: answer, isCorrect: answer === QUESTIONS[questionIndex].answers[0] });

			setTimeout(() => {
				onSelectAnswer(answer);
				// setAnswer({ selectedAnswer: "", isCorrect: null });
				// Here we do not have to use this above line because as soon as we pass the answer to the parent component, parent component will remount this component (QuestionAnswer) because of the key prop, and then because it's a new component, it will use the initial state value of this component.
			}, 2000);
		}, 1000);
	}

	let answerState = "";
	if (answer.selectedAnswer && answer.isCorrect === null) {
		answerState = "answered";
	} else if (answer.selectedAnswer && answer.isCorrect !== null) {
		answerState = answer.isCorrect ? "correct" : "wrong";
	}

	return (
		<div id="question">
			<QuestionTimer timeout={10000} onTimeout={onTimeout} />
			<h2>{QUESTIONS[questionIndex].text}</h2>
			<Answers
				answers={QUESTIONS[questionIndex].answers}
				answerState={answerState}
				selectedAnswer={answer.selectedAnswer}
				onSelect={handleSelectAnswer}
			/>
		</div>
	);
}
