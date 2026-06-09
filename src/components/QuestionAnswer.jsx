import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function QuestionAnswer({ onTimeout, questionText, answers, answerState, userAnswers, onSelect }) {
	return (
		<div id="question">
			<QuestionTimer timeout={10000} onTimeout={onTimeout} />
			<h2>{questionText}</h2>
			<Answers answers={answers} answerState={answerState} userAnswers={userAnswers} onSelect={onSelect} />
		</div>
	);
}
