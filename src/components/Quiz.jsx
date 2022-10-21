import { useEffect, useRef, useState } from 'react';
import {questionsData} from '../assets/data';
import Question from './Question';
import Pagination from './Pagination';
import Results from './Results';


export default function Quiz(props) {
  const [questions, setQuestions] = useState()
  const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
  const [score, setScore] = useState(null)
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false)
  const [showResults, setShowResults] = useState()

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
      setCurrentPage((prev) => {
        if(prev == 1) {
          return 1
        } else {
          return prev-1
        }
      })
    } else if(e.target.id == 'btn-next') {
      setCurrentPage((prev) => {
        if(prev == totalPages) {
          return totalPages
        } else {
          return prev+1
        }
      })
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
    let newScore = {
      mode: props.options.mode,
      totalQuestions: questions.length,
      questionsSection1: 0,
      questionsSection2: 0,
      questionsSection3: 0,

      totalCorrectAnswers: 0,
      correctAnswersSection1: 0,
      correctAnswersSection2: 0,
      correctAnswersSection3: 0,
    }

    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if(answer.isSelected && answer.isCorrect) {
          switch(question.category) {
            case 1:
              newScore.correctAnswersSection1 +=1
              break;
            case 2:
              newScore.correctAnswersSection2 +=1
              break;
            case 3:
              newScore.correctAnswersSection3 +=1
              break;
          }
        }
      })
    })

    questions.forEach((question) => {
        switch(question.category) {
          case 1:
            newScore.questionsSection1 +=1
            break;
          case 2:
            newScore.questionsSection2 +=1
            break;
          case 3:
            newScore.questionsSection3 +=1
            break;
        }
      })

    setScore(newScore)
    setShowCorrectAnswers(true)
    setShowResults(true)
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

  const displayResults = () => {
    setShowResults(true)
  }

  const hideResults = () => {
   setShowResults(false)
  }

  let resultsOverlayStyle
  if(showResults == true) {
    resultsOverlayStyle = 'results-overlay active'
  } else {
    resultsOverlayStyle = 'results-overlay'
  }

  return (
    <>
      <section className='questions-container'>
        <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage}/>
        {questionsDisplay}
        <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage}/>
        {score==null ?
          <button className='btn btn-primary' onClick={checkAnswers}>Check Answers</button>
        :
          <div className='buttons-container'>
            <button className='btn btn-primary' onClick={props.playAgain}>Play Again</button>
            <button className='btn btn-secondary' onClick={displayResults}>Show Results</button>
          </div>
        }
      </section>
      <div className={resultsOverlayStyle}>
      {showResults ? <Results score={score} showResults={showResults} hideResults={hideResults}/> : <></>}
      </div>
    </>
  )
}