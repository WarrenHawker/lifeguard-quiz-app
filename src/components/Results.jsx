export default function Results(props) {
  if(props.score) {
    let Percentages = {
      total: (props.score.totalCorrectAnswers / props.score.totalQuestions) * 100,
      section1: (props.score.correctAnswersSection1 / props.score.questionsSection1) * 100,
      section2: (props.score.correctAnswersSection2 / props.score.questionsSection2) * 100,
      section3: (props.score.correctAnswersSection3 / props.score.questionsSection3) * 100,
    }
    return (
        <div className="results-container">
        <i onClick={props.hideResults} className="fa fa-window-close" id="results-close"></i>
          <h1>Your results</h1>
          <div className="results-sub-container">
            <h4>Totals</h4>
            <p>total questions:</p> <span>{props.score.totalQuestions}</span>
            <p>total correct answers:</p> <span>{props.score.totalCorrectAnswers}</span>
            <p>percentage of answers correct:</p> <span>{Percentages.total}%</span>
          </div>
          <div className="results-sub-container categories">
          <h4>Category breakdown</h4>
            <p>Section 1:</p><span className="black">{props.score.correctAnswersSection1} / {props.score.questionsSection1}</span><span>{isNaN(Percentages.section1)? 0 : Percentages.section1}%</span>
            <p>Section 2:</p><span className="black">{props.score.correctAnswersSection2} / {props.score.questionsSection2}</span><span>{isNaN(Percentages.section2)? 0 : Percentages.section2}%</span>
            <p>Section 3:</p><span className="black">{props.score.correctAnswersSection3} / {props.score.questionsSection3}</span><span>{isNaN(Percentages.section3)? 0 : Percentages.section3}%</span>
          </div>
    
          <h5>In the real theory paper, the pass mark is <span>80% per section.</span></h5>      
          <h5>Please review any questions you got wrong. If you have any queries, speak to your trainer</h5>
        </div>
      )
  }
  
}