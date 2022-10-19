export default function Question(props) {

	let style
	

	return (
		<article id={props.data.id}>	
			<h2>{props.data.question}</h2>
			{
				props.data.answers.map((answer) => {
					if(!props.showCorrectAnswers) {
						if(!answer.isSelected) {
							style = {
								backgroundColor: 'white'
							}
						}	else if(answer.isSelected) {
							style = {
								backgroundColor: 'grey'
							}
						} 
					} else if(props.showCorrectAnswers) {
						if(answer.isCorrect && answer.isSelected) {
							style = {
								backgroundColor: 'green'
							} 
						} else if(answer.isCorrect && !answer.isSelected) {
							style = {
								backgroundColor: 'red'
							} 
						} else if(!answer.isCorrect && answer.isSelected) {
							style = {
								backgroundColor: 'grey'
							}
						}	else {
							style = {
								backgroundColor: 'white'
							} 
						}
					} 
					return (
						<button style={style} onClick={props.selectAnswer} id={answer.id} key={answer.id}>{answer.answer}</button>
					)
				})
			}
		</article> 
	)
}

// className={answer.isSelected ? "selected" : ""}