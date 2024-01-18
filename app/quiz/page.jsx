"use client";
import React, { useState } from "react";
import { quiz } from "../data.js";
import Image from "next/image";
import Quotes from "../../public/Quotes.svg";
import arrow from "../../public/arrow.svg";
import checkmark from "../../public/checkmark.svg";

const page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];
  const [answerIndexes, setAnswerIndexes] = useState([]);

  //   Select and check answer
  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const getColor = (anwser, idx, correctAnswer) => {
    if (anwser[idx] === correctAnswer) {
      return "rounded-full w-2 h-2  bg-green";
    } else {
      return "rounded-full w-2 h-2  bg-red";
    }
  };

  const nextQuestion = (awnserIndex) => {
    setAnswerIndexes((prevIndexes) => [...prevIndexes, awnserIndex]);
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className="container">
      {!showResult ? (
        <div className=" ring-1 ring-button p-4 rounded-md flex gap-4 items-center mb-12">
          <Image
            priority
            src={Quotes}
            alt="Follow us on Twitter"
            width={25}
            height={25}
          />
          {questions[activeQuestion].question}
        </div>
      ) : null}
      <div>
        {!showResult ? (
          <div className="quiz-container flex gap-4 flex-col">
            {answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={
                  selectedAnswerIndex === idx
                    ? " bg-blue p-4"
                    : " bg-button p-4"
                }
              >
                {answer}
              </button>
            ))}
            <div className=" flex  justify-between  mt-6">
              <div className=" flex gap-4">
                <div className=" w-10 h-10 flex justify-center items-center bg-button rounded-md">
                  {activeQuestion + 1}
                </div>
                <div className="flex gap-2 justify-center items-center">
                  {questions.map((question, idx) => (
                    <div
                      key={idx}
                      className={
                        idx === activeQuestion
                          ? " rounded-full w-2 h-2 bg-blue ring-1 ring-offset-2 ring-offset-mainOffset ring-blue"
                          : idx < activeQuestion
                          ? getColor(
                              question.answers,
                              answerIndexes[idx],
                              question.correctAnswer
                            )
                          : "rounded-full w-2 h-2  bg-button"
                      }
                    >
                      {}
                    </div>
                  ))}
                </div>
              </div>
              {checked ? (
                <button
                  onClick={() => nextQuestion(selectedAnswerIndex)}
                  className="bg-blue flex gap-2 justify-center items-center"
                >
                  {activeQuestion === question.length ? "Finish" : "Next step"}
                  {activeQuestion === question.length ? null : (
                    <Image
                      priority
                      src={arrow}
                      alt="Follow us on Twitter"
                      width={15}
                      height={15}
                    />
                  )}
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  disabled
                  className="bg-blue bg-opacity-50 cursor-not-allowed"
                >
                  {" "}
                  {activeQuestion === question.length ? "Finish" : "Next step"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="quiz-container relative flex flex-col justify-center items-center">
            <Image
            priority
            src={checkmark}
            alt="Congratulations!"
            width={300}
            />

          <h3 className="text-2xl text-center pb-8 pt-0">Congratulations <br/> Quiz finished! </h3>

          <div className="flex gap-1 justify-center items-center">
            <span>
              {result.correctAnswers}/{questions.length}
            </span>
            <br/>
            {questions.map((question, idx) => (
              <div
                key={idx}
                className={getColor(
                  question.answers,
                  answerIndexes[idx],
                  question.correctAnswer
                )}
              >
                {}
              </div>
            ))}
          </div>

          <button className="mt-8 bg-blue" onClick={() => window.location.reload()}>Try again</button>
        </div>

        )}
      </div>
    </div>
  );
};

export default page;
