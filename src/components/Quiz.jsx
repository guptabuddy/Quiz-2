import { useCallback, useState } from "react";
import QUESTIONS from "../../questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionAnswer from "./QuestionAnswer.jsx";

export default function Quiz() {
	const [answerState, setAnswerState] = useState("");
	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length - 1;

	const quizIsOver = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(
		function handleSelectAnswer(selectedAnswer) {
			setAnswerState("answered");
			setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);

			setTimeout(() => {
				if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
					setAnswerState("correct");
				} else {
					setAnswerState("wrong");
				}

				setTimeout(() => {
					setAnswerState("");
				}, 2000);
			}, 1000);
		},
		[activeQuestionIndex],
	);

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
				onTimeout={handleSelectAnswer}
				questionText={QUESTIONS[activeQuestionIndex].text}
				answers={QUESTIONS[activeQuestionIndex].answers}
				answerState={answerState}
				selectedAnswer={userAnswers[userAnswers.length - 1]}
				onSelect={handleSelectAnswer}
			/>
		</div>
	);
}
