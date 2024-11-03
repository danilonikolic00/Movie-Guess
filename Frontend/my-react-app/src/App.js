import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pocetna from './components/Pocetna/Pocetna';
import Igrica from './components/Igrica/Igrica';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Pocetna />} />
      <Route path="/igra" element={<Igrica />} />
      </Routes>
    </Router>
  );
}

export default App;
