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
		<article id={props.data.id}>	
			<h2>{props.data.question}</h2>
			{
				props.data.answers.map((answer) => {
					let style = {
						backgroundColor: 'white'
					}
					if(!props.showCorrectAnswers) {
						if(answer.isSelected) {
							style.backgroundColor = 'grey'
						}
					} 
					else if(props.showCorrectAnswers) {
						if(answer.isCorrect && answer.isSelected) {
							style.backgroundColor = 'green'
						} else if(answer.isCorrect && !answer.isSelected) {
							style.backgroundColor = 'red'
						} else if(!answer.isCorrect && answer.isSelected) {
							style.backgroundColor = 'grey'
						}	else {
							style.backgroundColor = 'white'
						}
					} 
					return (
						<button disabled={props.showCorrectAnswers ? true : false} style={style} onClick={props.selectAnswer} id={answer.id} key={answer.id}>{answer.answer}</button>
					)
				})
			}
			{isCorrect == false ?
				<p>This question is incorrect, please review by going to page {props.data.pageRef} in your lifeguard manual</p> : <></>
			}
		</article> 
	)
}