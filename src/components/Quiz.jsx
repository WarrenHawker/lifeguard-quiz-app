import { useEffect, useState } from 'react';
import {questionsData} from '../assets/data';
import Questions from './Questions';


export default function Quiz(props) {
  const [questions, setQuestions] = useState()
  const [pages, setPages] = useState()
  console.log(pages)
  useEffect(() => {
    if(props.options.mode == 'mock') {
      setQuestions(questionsData)
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
        })
      setQuestions(selectedQuestions)
    }    
  },[])

  useEffect(() => {
    if(questions) {
      if(Math.ceil(questions.length/5) < 2) {
        setPages(1)
      } else {
        setPages(Math.ceil(questions.length/5))
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

  if(questions) {
    return (
      <>
        <Questions questions={questions}/>
        <button>Check Answers</button>
      </>
    )
  } else return <></>
 
}