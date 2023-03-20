import React, { useState } from "react";

const questions = [
  { id: 1, text: "What is your favorite color?" },
  { id: 2, text: "What is your favorite food?" },
  { id: 3, text: "What is your favorite movie?" }
];

function QuestionList() {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (event, questionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: event.target.value
    });
  };

  return (
    <div>
      <h2>Answer the following questions:</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h3>{question.text}</h3>
            <label>
              <input
                type="radio"
                value="option1"
                checked={selectedOptions[question.id] === "option1"}
                onChange={(event) => handleOptionChange(event, question.id)}
              />
              Option 1
            </label>
            <label>
              <input
                type="radio"
                value="option2"
                checked={selectedOptions[question.id] === "option2"}
                onChange={(event) => handleOptionChange(event, question.id)}
              />
              Option 2
            </label>
            <label>
              <input
                type="radio"
                value="option3"
                checked={selectedOptions[question.id] === "option3"}
                onChange={(event) => handleOptionChange(event, question.id)}
              />
              Option 3
            </label>
          </li>
        ))}
      </ul>
      <h2>You selected:</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.text}: {selectedOptions[question.id]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
