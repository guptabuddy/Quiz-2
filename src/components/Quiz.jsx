import { useCallback, useState } from "react";
import QUESTIONS from "../../questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionAnswer from "./QuestionAnswer.jsx";

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestionIndex = userAnswers.length;

	const quizIsOver = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
		setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
	}, []);

	if (quizIsOver) {
		return (
			<div id="summary">
				<img src={quizCompletedImg} alt="Quiz completed" />
				<h2>You've completed the quiz!</h2>
			</div>
		);
	}

	return (
		<div id="quiz">
			<QuestionAnswer
				key={activeQuestionIndex}
				questionIndex={activeQuestionIndex}
				onTimeout={handleSelectAnswer}
				onSelectAnswer={handleSelectAnswer}
			/>
		</div>
	);
}
