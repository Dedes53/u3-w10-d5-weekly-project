import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';
import SearchCity from './pages/SearchCity';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchCity />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
