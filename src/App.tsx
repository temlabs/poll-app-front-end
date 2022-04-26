import CreatePoll from "./components/CreatePoll";
import VoteInPoll from "./components/VoteInPoll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main-style.css";
function App(): JSX.Element {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePoll/>}/>
        <Route path="/polls" element={<VoteInPoll/>}/>
      </Routes>
    </Router>
  );
}

export default App;
