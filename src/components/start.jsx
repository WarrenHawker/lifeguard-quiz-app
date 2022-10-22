import { useState } from "react"

export default function Start(props) {
  const [mode, setMode] = useState()
  const [category, setCategory] = useState('random')
  const [questionsAmount, setQuestionsAmount] = useState(5)
  const [paper, setPaper] = useState(1)
  const modeSelect = (e) => {
    setMode(e.target.value)
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let options
    if(mode == 'quickfire') {
      options = {
        mode: 'quickfire',
        category: category,
        questionsAmount: questionsAmount,
        paper: null,
      }
    } else {
      options = {
        mode: 'mock',
        category: null,
        questionsAmount: null,
        paper: paper,
      }
    }

    props.startFormHandler(options)
  }

  const categorySelect = (e) => {
    setCategory(e.target.value)
  }

  const amountSelect = (e) => {
    setQuestionsAmount(e.target.value)
  }

  const paperSelect = (e) => {
    setPaper(e.target.value)
  }


  return (
    <>
      <header className="start-header">
          <h1>Welcome to the <span className="yellow">NPLQ Lifeguard</span> training quiz</h1>
          <h3>Real questions to prepare you for your  <span className="yellow">NPLQ</span> theory exam</h3>
        </header>
        
      <section>
        <form onSubmit={formSubmitHandler}>
          <fieldset>
            <label htmlFor="mode">Select Quiz Mode</label>
            <select name="mode" onChange={modeSelect}>
              <option value="" selected disabled>--select--</option>
              <option value="quickfire">Quickfire</option>
              <option value="mock">Mock Test</option>
            </select>
          </fieldset>
          {
            mode=='quickfire'? 
              <>
              <div className="mode-info-container">
                <h4>Answer questions as quickly as you can!</h4>
                <p> Select your chosen category or Random to get questions from all categories.</p>
              </div>
                <fieldset>
                  <label htmlFor="category">Select Category</label>
                    <select name="category" onChange={categorySelect}>
                      <option value="random">Random</option>
                      <option value="1">Section 1 (lifeguard theory)</option>
                      <option value="2">Section 2 (intervention and rescue)</option>
                      <option value="3">Section 3 (CPR and first aid)</option>
                    </select>
                </fieldset>
                <fieldset className="slider-container">
                  <label htmlFor="questionsAmount">How many questions do you want to answer?</label>
                  <input type="range" min="1" max="20" defaultValue={questionsAmount} onChange={amountSelect}></input>
                  <label className="sub-label">{questionsAmount}</label>              
                </fieldset> 
              </>
            : mode=='mock' ? 
            <>
              <div className="mode-info-container">
                <h4>Take a full mock test</h4>
                <p> Select your chosen test paper and answer all the questions within the time limit (58 questions total).</p>
              </div>
              <fieldset>
                <label htmlFor="paper">Select mock paper</label>
                <select name="paper" onChange={paperSelect}>
                  <option value="1">Paper 1</option>
                  <option value="2">Paper 2</option>
                </select>
              </fieldset>
            </>
            : <></>
          }
          <button className="btn btn-primary" disabled={!mode ? true : false}>Start Quiz</button>
        </form>
      </section>
    </>
  )
}