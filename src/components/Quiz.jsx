import { useCallback, useState } from "react";
import QUESTIONS from "../../questions.js";
import QuestionAnswer from "./QuestionAnswer.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestionIndex = userAnswers.length;

	const quizIsOver = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
		setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
	}, []);

	if (quizIsOver) {
		return <Summary userAnswers={userAnswers} />;
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
