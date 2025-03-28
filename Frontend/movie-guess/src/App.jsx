import './App.css'
import Game from "../src/components/Game/Game"
import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </Router>
  )
}

export default App
