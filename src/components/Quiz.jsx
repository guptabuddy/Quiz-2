import { useCallback, useState } from "react";
import QUESTIONS from "../../questions.js";
import quizCompletedImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
	const [answers, setAnswers] = useState([]);
	const activeQuestionIndex = answers.length;

	const quizIsOver = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
		setAnswers((prevAnswers) => [...prevAnswers, answer]);
	}, []);

	if (quizIsOver) {
		return (
			<>
				<img src={quizCompletedImg} alt="Quiz completed" />
				<h2>You've completed the quiz!</h2>
			</>
		);
	}

	const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
	shuffledAnswers.sort(() => Math.random() - 0.5);

	return (
		<div id="quiz">
			<div id="question">
				<QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSelectAnswer} />
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
				<ul id="answers">
					{shuffledAnswers.map((answer) => (
						<li key={answer} className="answer">
							<button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
