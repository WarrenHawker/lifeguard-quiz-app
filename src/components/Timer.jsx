import { useEffect, useState, useRef } from "react"
import { useInterval } from "usehooks-ts"

export default function Timer(props) {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timesUp, setTimesUp] = useState(false)
  const timer = useRef(null)
  

  useEffect(() => {
    if(props.mode == 'quickfire') {
      setMinutes(0)
      setSeconds(0)     
    } else if(props.mode == 'mock') {
      setMinutes(0)
      setSeconds(5)
    }
  },[])

  const changeTimer = () => {
    if(timesUp) {
      timer.current.classList.toggle('red')
    } else {
      if(props.mode == 'quickfire' && !props.showCorrectAnswers) {
        if(seconds == 59) {
          setMinutes(prevMinutes => prevMinutes+1)
          setSeconds(0)
        } else {
          setSeconds(prevSeconds => prevSeconds+1)
        }
      } else if(props.mode == 'mock' && !props.showCorrectAnswers) {
        if(minutes == 0 && seconds == 1) {
          setTimesUp(true)
          timer.current.classList.toggle('red')
          setSeconds(0)
        } else if(seconds == 0) {
          setMinutes(prevMinutes => prevMinutes-1)
          setSeconds(59)
        } else {
          setSeconds(prevSeconds => prevSeconds-1)
        }
      }
    }
  }

  useInterval(changeTimer, 1000)
  
  const convertTime = (time) => {
    if(time == 0) {
      return '00'
    } else if (time < 10) {
      return `0${time}`
    } else return time
  }

  const minutesDisplay = convertTime(minutes)
  const secondsDisplay = convertTime(seconds)
  
  return (
    <div className="timer">
      <h5 ref={timer}>  {minutesDisplay} : {secondsDisplay}</h5>
    </div>
  )
}