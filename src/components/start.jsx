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
    <section>
      <header className="start-header">
        <h1>Welcome to the <span className="yellow">NPLQ Lifeguard</span> training quiz</h1>
        <h3>Select which mode you'd like to play and good luck!</h3>
      </header>
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
            <fieldset>
              <label htmlFor="category">Select Category</label>
                <select name="category" onChange={categorySelect}>
                  <option value="random">Random</option>
                  <option value="1">Section 1 (lifeguard theory)</option>
                  <option value="2">Section 2 (intervention and rescue)</option>
                  <option value="3">Section 3 (CPR and first aid)</option>
                </select>
              <label htmlFor="questionsAmount">How many questions do you want to answer?</label>
              <input type="range" min="1" max="10" defaultValue="5" onChange={amountSelect}></input>              
            </fieldset> 
          : mode=='mock' ? 
            <>
              <label htmlFor="paper">Select mock paper</label>
              <select name="paper" onChange={paperSelect}>
                <option value="1">Paper 1</option>
                <option value="2">Paper 2</option>
              </select>
            </>
            : <></>
        }
        <button disabled={!mode ? true : false}>Start Quiz</button>
      </form>
    </section>
  )
}