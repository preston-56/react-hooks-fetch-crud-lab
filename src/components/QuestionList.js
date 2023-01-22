import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestions(questions));
  }, []);

  // add handleDelete function to QuestionItem
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updateQuizList = questions.filter((q) => q.id !== id);
        setQuestions(updateQuizList);
      });
  }

  // add handleAnswerChange
  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuizList = questions.map((question) => {
          if (question.id === updatedQuizList.id) return updatedQuizList;
          return question;
        });
        setQuestions(updatedQuizList);
      });
  }

  // map over the question
  const questionItems = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
