import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Make sure the API URL is correct in your .env file
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/quiz`);
        setQuizData(response.data);
      } catch (error) {
        // Update error handling to provide more specific error message
        setError(error.response ? error.response.data.error : "Error fetching quiz data");
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  const handleCreateQuiz = () => {
    navigate("/create-quiz"); // Redirect to the create quiz page
  };

  const handleAttemptQuiz = (quizId) => {
    navigate(`/attempt-quiz/${quizId}`); // Redirect to attempt quiz page with the quizId
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Available Quizzes</h1>

      <button onClick={handleCreateQuiz}>Create a New Quiz</button>
      <h2>Quizzes:</h2>

      {quizData.length === 0 ? (
        <p>No quizzes available yet. Please check back later.</p>
      ) : (
        <ul>
          {quizData.map((quiz) => (
            <li key={quiz._id}>
              <span>{quiz.title}</span>
              <button onClick={() => handleAttemptQuiz(quiz._id)}>Attempt Quiz</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Quiz;
