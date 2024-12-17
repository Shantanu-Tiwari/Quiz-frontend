import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: "" }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    if (event.target.name === "question") {
      newQuestions[index].question = event.target.value;
    } else {
      newQuestions[index].options[event.target.name] = event.target.value;
    }
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/quiz/create`,
        { title, questions },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } // Assuming you have JWT token in localStorage
      );
      alert("Quiz created successfully!");
      navigate("/quiz"); // Navigate to the quizzes page after successful creation
    } catch (error) {
      setError("Error creating quiz. Please try again.");
      console.error("Error creating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter quiz title"
          />
        </div>

        {questions.map((question, index) => (
          <div key={index}>
            <h3>Question {index + 1}</h3>
            <div>
              <label>Question Text:</label>
              <input
                type="text"
                name="question"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                placeholder="Enter question"
              />
            </div>

            <div>
              <label>Options:</label>
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  name={optionIndex}
                  value={option}
                  onChange={(e) => handleQuestionChange(index, e)}
                  required
                  placeholder={`Option ${optionIndex + 1}`}
                />
              ))}
            </div>

            <div>
              <label>Correct Answer (Option Index):</label>
              <input
                type="number"
                value={question.answer}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].answer = e.target.value;
                  setQuestions(newQuestions);
                }}
                required
                placeholder="Enter the index of the correct option"
              />
            </div>

            <button type="button" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add New Question
        </button>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
