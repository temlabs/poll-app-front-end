import CreatePoll from "./components/CreatePoll";
import VoteInPoll from "./components/VoteInPoll";
import PollCreated from "./components/PollCreated";
import "./styles/main-style.css";
import logo from "./images/p-poll-head.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  // let mainContent: JSX.Element;
  // if (window.location.href.match("polls/#/*")) {
  //   mainContent = <VoteInPoll />;
  // } else {
  //   mainContent = <CreatePoll />;
  // }

  return (
    <Router>
      <header className="flex-container-column centre-children">
        <img src={logo} alt="p poll logo" />
      </header>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/created" element={<PollCreated />} />
        <Route path="/polls" element={<VoteInPoll />} />
        <Route path="*" element={<h1>ERROR</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
