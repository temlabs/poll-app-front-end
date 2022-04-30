import { pollUrlProps } from "../utils/interfaces";
import { useLocation } from "react-router-dom";

export default function PollCreated(): JSX.Element {
  let voteUrl = "";
  let masterUrl = "";
  let questionText = "";

  const pollDetails = useLocation();
  if (pollDetails.state !== null) {
    voteUrl = (pollDetails.state as pollUrlProps).voteUrl;
    masterUrl = (pollDetails.state as pollUrlProps).masterUrl;
    questionText = (pollDetails.state as pollUrlProps).questionText;
  }

  return (
    (pollDetails.state !== null && (
      <>
        <section className="flex-container-column centre-children post-submit">
          <div>
            <input
              value={questionText}
              className="question-input"
              style={{ opacity: "1", color: "rgb(0,0,0)", textAlign: "center" }}
              disabled={true}
            ></input>
          </div>
          <div className="poll-info flex-container-column">
            <p className="poll-label">Your poll is now live!</p>
            <p className="poll-label">The master URL is:</p>
            <span className="flex-container-row">
              <p className="poll-link">{masterUrl}</p>
              <button
                onClick={() => navigator.clipboard.writeText(masterUrl)}
                className="copy-button"
              >
                Copy
              </button>
              <a href={masterUrl} target="_blank" rel="noopener noreferrer">
                Go!
              </a>
            </span>

            <p className="poll-label">The voting URL is:</p>
            <span className="flex-container-row">
              <p className="poll-link">{voteUrl}</p>
              <button
                onClick={() => navigator.clipboard.writeText(voteUrl)}
                className="copy-button"
              >
                Copy
              </button>
              <a href={voteUrl} target="_blank" rel="noopener noreferrer">
                Go!
              </a>
            </span>
          </div>
        </section>
      </>
    )) || (
      <h1 style={{ textAlign: "center" }}>
        Only the poll master has been entrusted with the knowledge of the poll.
      </h1>
    )
  );
}
