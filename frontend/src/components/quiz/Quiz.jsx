import React, { useState, useEffect } from "react";
import axios from "axios";
import "./quiz.css";

import { Button, CardActionArea, CardActions } from "@mui/material";

import Box from "@mui/material/Box";

import { NavLink } from "react-router-dom";
const NavbarContainer = ({ children }) => (
  <div style={{ backgroundColor: "#0c0e0d", color: "lightgray", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    {children}
  </div>
);
const topics = ["Atomic Structure", "Periodic Table", "Metals", "Hydrocarbons"];

function Quiz() {
  const [num, setNum] = useState(1);
  const [difficulty, setDifficulty] = useState("");
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [incorrectlyAnswered, setIncorrectlyAnswered] = useState([]);
  const [explanations, setExplanations] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [generatingQuiz, setGeneratingQuiz] = useState(false); // Generating quiz state
  const [formSubmitted, setFormSubmitted] = useState(false); // Form submission state
  const [selectedTopic, setSelectedTopic] = useState(""); // Selected topic state
  useEffect(() => {
    setTopic(topics[Math.floor(Math.random() * topics.length)]);
  }, []);

  const handleGenerateQuiz = async () => {
    if (!num || !difficulty || !topic) {
      setFormSubmitted(true);
      return;
    }
    setGeneratingQuiz(true); // Start generating quiz
    setLoading(true); // Start loading animation
    try {
        const response = await axios.post(
            'http://localhost:8000/quiz/quizapp/',
            {
              num: num,
              difficulty: difficulty,
              topic: topic
            }
          );
      setQuiz(response.data.data.json);
      console.log(response.data.data.answer)
      setAnswers({});
      setScore(null);
      setIncorrectlyAnswered([]);
      setExplanations({});
      setTopic(selectedTopic);
    } catch (error) {
      console.error("Error generating quiz:", error);
      // Handle error gracefully
    } finally {
      setLoading(false); // Stop loading animation
      setGeneratingQuiz(false); // Stop generating quiz
    }
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    if (score !== null) {
      return;
    }

    setAnswers({
      ...answers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length !== quiz.question.length) {
      // Ensure all questions are answered before submitting
      alert("Please answer all questions before submitting.");
      return;
    }

    let correctAnswers = 0;
    let incorrectAnswers = [];
    quiz.question.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctAnswers++;
      } else {
        incorrectAnswers.push(index);
      }
    });
    setScore(correctAnswers);
    setIncorrectlyAnswered(incorrectAnswers);
  };

  return (
    <>
    <NavbarContainer>
        <Box display="flex" alignItems="center">
        <img src="..\src\assets\logo.png" alt="Logo" style={{ width: "200px", marginRight: "20px" }} />
          {/* <Typography variant="h6" style={{ fontWeight: "400", color:"e6dddd" }}>Subjects</Typography> */}
        </Box>
        
       <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <NavLink 
          to="/subject" 
          style={{ 
            textDecoration: 'none', 
            marginRight: '20px',
            borderBottom: location.pathname === '/subject' ? '2px solid #ff6542' : 'none'
          }}
        >
          <Button color="inherit">Subjects</Button>
        </NavLink>
        <NavLink 
          to="/courses" 
          style={{ 
            textDecoration: 'none', 
            marginRight: '20px',
            borderBottom: location.pathname === '/courses' ? '2px solid #ff6542' : 'none'
          }}
        >
          <Button color="inherit">Courses</Button>
        </NavLink>
        <NavLink 
          to="/quiz" 
          style={{ 
            textDecoration: 'none',
            marginRight: '20px',
            borderBottom: location.pathname === '/quiz' ? '2px solid #ff6542' : 'none'
          }}
        >
          <Button color="inherit">Test Yourself</Button>
        </NavLink>
        <NavLink 
          to="/login" 
          style={{ 
            textDecoration: 'none',
            borderBottom: location.pathname === '/login' ? '2px solid #ff6542' : 'none'
          }}
        >
          <Button color="inherit">Logout</Button>
        </NavLink>
      </div>
</NavbarContainer>
    <div className="App">
      
      <h1 className="text-3xl font-bold text-center mb-4">Test Your Knowledge</h1>
      <div className="form-card">
        <label htmlFor="num" className="form-label">
          Number of Questions:
        </label>
        <select
          id="num"
          value={num}
          onChange={(e) => setNum(parseInt(e.target.value))}
          className="form-select"
        >
          <option value={0}>Select</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <label htmlFor="difficulty" className="form-label">
          Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="form-select"
        >
          <option value="">Select</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label htmlFor="topic" className="form-label">
          Topic:
        </label>
        <select
          id="topic"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="form-select"
        >
          <option value="">Select</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {formSubmitted && (!num || !difficulty || !topic) && (
          <p className="form-error">All fields are mandatory</p>
        )}
        <div className="text-center mt-4">
          <button onClick={handleGenerateQuiz} className="form-button">
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </div>
      </div>
      {score !== null && (
            <div className="score-container">
              <div className="score-text">Your Score:</div>
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(score / quiz.question.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="score-value">{score}/{quiz.question.length}</div>
            </div>
          )}
      {quiz && (
        <div>
          <div className="title-card">
  <h2 className="title-text">{topic.toUpperCase()} QUIZ</h2>
</div>
          {quiz?.question?.map((question, questionIndex) => (
            <div key={questionIndex} className="question-card">
              <h3 className="question-text">{questionIndex + 1}. {question.question}</h3>
              <div className="option-list">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`option ${
                      answers[questionIndex] === optionIndex ? "selected" : ""
                    }`}
                    onClick={() => handleAnswerChange(questionIndex, optionIndex)}
                    disabled={score !== null}
                  >
                    {option}
                  </div>
                ))}
              </div>
              {incorrectlyAnswered.includes(questionIndex) && (
                <label className="incorrect">Incorrect</label>
              )}
              {explanations[questionIndex] && <p>{explanations[questionIndex]}</p>}
            </div>
          ))}
          <div className="text-center mt-4">
            <button onClick={handleSubmitQuiz} className="form-button">
              Submit Answers
            </button>
          </div>
          
        </div>
      )}
      {generatingQuiz && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
    </>
  );
}

export default Quiz;
