import CreatePoll from "./components/CreatePoll";
import VoteInPoll from "./components/VoteInPoll";
import "./styles/main-style.css";
import logo from "./images/p-poll-head.png";

function App(): JSX.Element {
  let mainContent: JSX.Element;
  if (window.location.href.match("polls/#/*")) {
    mainContent = <VoteInPoll />;
  } else {
    mainContent = <CreatePoll />;
  }

  return (
    <>
      <header className="flex-container-column centre-children">
        <img src={logo} alt="p poll logo" />
      </header>
      <section>{mainContent}</section>
    </>
  );
}

export default App;
