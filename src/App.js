
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Viewcity } from "./pages/Viewcity";
import { Editcity } from './pages/Editcity';
import { ViewEditcity } from './pages/ViewEditcity';


function App() {

  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/citylist" element={<Viewcity />} />
          <Route exact path="/editcity/:id" element={<Editcity />} />
          <Route exact path="/vieweditcity/:id" element={<ViewEditcity />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
