export default function Questions(props) {
	console.log(props)

	const questionsDisplay = props.questions.map((question) => {
		return (
			<>	
				<h2>{question.question}</h2>
				{
					question.answers.map((answer) => {
						return (
							<button>{answer.answer}</button>
						)
					})
				}
			</>
		)
	})

	return (
	<>
		{questionsDisplay}
	</>
	)
}
