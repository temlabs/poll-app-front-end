import { pollUrlProps } from "../utils/interfaces";

export default function PollCreated({
  questionText,
  pollUrls,
}: {
  questionText: string;
  pollUrls: pollUrlProps;
}): JSX.Element {
  return (
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
          {/* <p className="poll-label">The master URL is:</p>
                <span className="flex-container-row">
                <p className="poll-link">{pollUrls.masterUrl}</p>
                <button
                    onClick={() =>
                    navigator.clipboard.writeText(pollUrls.masterUrl)
                    }
                    className="copy-button"
                >
                    Copy
                </button>
                <a
                    href={pollUrls.masterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Go!
                </a>
                </span> */}

          <p className="poll-label">The voting URL is:</p>
          <span className="flex-container-row">
            <p className="poll-link">{pollUrls.voteUrl}</p>
            <button
              onClick={() => navigator.clipboard.writeText(pollUrls.voteUrl)}
              className="copy-button"
            >
              Copy
            </button>
            <a
              href={pollUrls.voteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go!
            </a>
          </span>
        </div>
      </section>
    </>
  );
}
