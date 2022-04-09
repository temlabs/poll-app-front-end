import CreatePoll from "./components/CreatePoll";
import VoteInPoll from "./components/VoteInPoll";
import "./styles/main-style.css";
function App(): JSX.Element {
  if(window.location.href.match('#/polls/*')){
    return <VoteInPoll />
  }
  else{
    return <CreatePoll />;  
  }
  
}

export default App;
