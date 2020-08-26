import React, { useEffect, useState, useCallback } from "react";
import Question from "./Question";
import { loadQuestions } from "./QuestionHelper";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";
const Game = ({ history }) => {
  const [questions, setQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    async function fetchOnMount() {
      const resQuestionLoaded = await loadQuestions();
      setQuestion(resQuestionLoaded);
    }
    fetchOnMount();
  }, []);

  const changeQuestion = useCallback(
    (bonus = 0) => {
      if (questions.length === 0) {
        setScore(score + bonus);
        return setDone(true);
      }
      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      const currentQuestion = questions[randomQuestionIndex];
      const remainingQuestions = [...questions];
      remainingQuestions.splice(randomQuestionIndex, 1);

      setQuestion(remainingQuestions);
      setCurrentQuestion(currentQuestion);
      setScore(score + bonus);
      setQuestionNumber(questionNumber + 1);
      setLoading(false);
    },
    [
      score,
      questionNumber,
      questions,
      setQuestion,
      setLoading,
      setCurrentQuestion,
      setQuestionNumber,
    ]
  );

  useEffect(() => {
    if (!currentQuestion && questions.length) {
      changeQuestion();
    }
  }, [questions, currentQuestion, changeQuestion]);

  const scoreSaved = () => {
    history.push("/");
  };
  return (
    <>
      {loading && !done && <div id="loader"></div>}
      {!done && !loading && currentQuestion && (
        <div>
          <HUD score={score} questionNumber={questionNumber} />

          <Question
            question={currentQuestion}
            changeQuestion={changeQuestion}
          />
        </div>
      )}
      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
};

export default Game;
