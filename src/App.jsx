import { useState } from "react"
import Start from "./components/Start"
import Quiz from "./components/Quiz"

export default function App() {
  const [startGame, setStartGame] = useState(false)
   //quiz mode will be 'quickfire' or 'mock' - will contain options for quickfire mode
  const [quizMode, setQuizMode] = useState('quickfire') 
 

  //grabs data from start screen and puts it into quizMode state
  const startFormHandler = (options) => { 
    setQuizMode(options)
    setStartGame(true)
  }

  const playAgain = () => {
    setStartGame(false)
  }

  return (
    <main>
    {!startGame? <Start startFormHandler={startFormHandler}/> : <Quiz playAgain={playAgain} options={quizMode}/>}
    </main>
  )
}