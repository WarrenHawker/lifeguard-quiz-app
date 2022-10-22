import Start from "./components/Start"
import Quiz from "./components/Quiz"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function App() {
  return (
    
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<Start/>}
            />
            <Route
              path='/quiz'
              element={<Quiz/>}
            />
          </Routes>
        </BrowserRouter>
      </main>
    
  )
}