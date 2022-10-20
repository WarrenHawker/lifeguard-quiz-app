import { useEffect, useState } from 'react';
import {questionsData} from '../assets/data';
import Question from './Question';


export default function Quiz(props) {
  const [questions, setQuestions] = useState()
  const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
  const [score, setScore] = useState(null)
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)

  useEffect(() => {
    if(props.options.mode == 'mock') {
      const selectedQuestions = questionsData.filter(question => question.paper == props.options.paper).map((question, index) => {
        const pageNum = Math.ceil((index+1)/5)
		      return ({...question, pageNum:pageNum})
      })
      setQuestions(selectedQuestions)
    } else if(props.options.mode == 'quickfire') {
      let selectedQuestions;
      let possibleQuestions;
      if(props.options.category == 'random') {
        possibleQuestions = questionsData;
      } else {
        possibleQuestions = questionsData.filter((question) => {
          return question.category == props.options.category        
        })
      }
      shuffle(possibleQuestions);

      selectedQuestions = possibleQuestions.filter((question, index) => {
          if(index < props.options.questionsAmount) {
            return question
          }
        }).map((question, index) => {
          const pageNum = Math.ceil((index+1)/5)
		      return ({...question, pageNum:pageNum})
        })
      setQuestions(selectedQuestions)
    }    
  },[])

  useEffect(() => {
    if(questions) {
      if(Math.ceil(questions.length/5) < 2) {
        setTotalPages(1)
      } else {
        setTotalPages(Math.ceil(questions.length/5))
      }
    }
  },[questions])

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const changePage = (e) => {
    if(e.target.id == 'btn-prev' ) {
      setCurrentPage(prev => prev-1)
    } else if(e.target.id == 'btn-next') {
      setCurrentPage(prev => prev+1)
    }
  }

  const selectAnswer = (e) => {
    const selectedAnswer = e.target.id
    const selectedQuestion = e.target.parentElement.id
    const updatedQuestions = questions.map((question) => {
      if(question.id == selectedQuestion) {
        const updatedAnswers = question.answers.map((answer) => {
          if(answer.id == selectedAnswer) {
            return {...answer, isSelected: true}
          } else {
            return {...answer, isSelected: false}
          }
        })
        return {...question, answers: updatedAnswers}
      } else return question
    })
    setQuestions(updatedQuestions)
  }

  const checkAnswers = () => {
    let count = 0
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if(answer.isSelected && answer.isCorrect) {
          return count++
        }
      })
    })
    setScore(count)
    setShowCorrectAnswers(true)
  }

  let questionsDisplay
  if(questions) {
    questionsDisplay = questions.filter(question => question.pageNum == currentPage)
    .map((question) => {
      return (
        <Question
          key={question.id}
          data={question}
          selectAnswer={selectAnswer}
          showCorrectAnswers={showCorrectAnswers}
        />
      )
    })
  }

  return (
    <section className='questions-container'>
      <h3>Page {currentPage} of {totalPages}</h3>
      {totalPages > 1 ?
        <>
          {currentPage != 1 ?
            <button id="btn-prev" onClick={changePage} className="">Previous</button>
            : <></>
          }
          {currentPage != totalPages ?
            <button id="btn-next" onClick={changePage}>Next</button>
            : <></>
          }
        </>
        : <></>
      }
      {questionsDisplay}
      {totalPages > 1 ?
        <>
          {currentPage != 1 ?
            <button id="btn-prev" onClick={changePage}>Previous</button>
            : <></>
          }
          {currentPage != totalPages ?
            <button id="btn-next" onClick={changePage}>Next</button>
            : <></>
          }
        </>
        : <></>
      }
      {score==null ?
        <button onClick={checkAnswers}>Check Answers</button>
      :
        <>
          <p>Your score is {score}</p>
          <button onClick={props.playAgain}>Play Again</button>
        </>
      }
    </section>
  )
}