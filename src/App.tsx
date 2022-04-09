import CreatePoll from "./components/CreatePoll";
import VoteInPoll from "./components/VoteInPoll";
import "./styles/main-style.css";
function App(): JSX.Element {
  let mainContent: JSX.Element;
  if (window.location.href.match("#/polls/*")) {
    mainContent = <VoteInPoll />;
  } else {
    mainContent = <CreatePoll />;
  }

  return (
    <>
      <header className="flex-container-column centre-children">
        <h2>
         We can't make everything perfect, but we can make up our minds :) 
        </h2>
        
      </header>
      <section>
        {mainContent}
      </section>    
    </>

    
  )
}

export default App;
