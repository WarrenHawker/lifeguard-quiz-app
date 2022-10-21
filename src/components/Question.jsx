import { useEffect, useState } from "react"

export default function Question(props) {
	const [isCorrect, setIsCorrect] = useState(null)

	useEffect(() => {
		if(props.showCorrectAnswers) {
			setIsCorrect(false)
			props.data.answers.forEach((answer) => {
				if(answer.isCorrect && answer.isSelected) {
					setIsCorrect(true)
				} 
			})
		}
	},[props.showCorrectAnswers])
	
	return (
		<article className="question" id={props.data.id}>	
			<h2>{props.data.question}</h2>
			{
				props.data.answers.map((answer) => {
					let style = 'btn btn-answer'
					
					if(!props.showCorrectAnswers) {
						if(answer.isSelected) {
							style = 'btn btn-answer selected'
						}
					} 
					else if(props.showCorrectAnswers) {
						if(answer.isCorrect && answer.isSelected) {
							style = 'btn btn-answer correct selected'
						} else if(answer.isCorrect && !answer.isSelected) {
							style = 'btn btn-answer correct'
						} else if(!answer.isCorrect && answer.isSelected) {
							style = 'btn btn-answer wrong selected'
						}	else {
							style = 'btn btn-answer not-selected'
						}
					} 
					return (
						<button className={style} disabled={props.showCorrectAnswers ? true : false} onClick={props.selectAnswer} id={answer.id} key={answer.id}>{answer.answer}</button>
					)
				})
			}
			{isCorrect == false ?
				<h5>You answered this question incorrectly. <br></br>Please review by going to <span>page {props.data.pageRef}</span> in your lifeguard manual.</h5> : <></>
			}
		</article> 
	)
}