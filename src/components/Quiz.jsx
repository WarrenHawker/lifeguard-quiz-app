import { useEffect, useState } from 'react';
import {questionsData} from '../assets/data';

export default function Quiz(props) {
  const [questions, setQuestions] = useState()
  console.log(props.options)
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
      console.log("selected questions: ", selectedQuestions)
      setQuestions(selectedQuestions)
    }    
  },[])

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

  return (
    <></>
  )
}