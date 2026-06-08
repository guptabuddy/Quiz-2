import { useCallback, useState, useRef } from "react";
import QUESTIONS from "../../questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
	const shuffledAnswers = useRef();
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

	if (!shuffledAnswers.current) {
		shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
		shuffledAnswers.current.sort(() => Math.random() - 0.5);
	}

	return (
		<div id="quiz">
			<div id="question">
				<QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSelectAnswer} />
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
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
								<button onClick={() => handleSelectAnswer(answer)} className={cssClass}>
									{answer}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
