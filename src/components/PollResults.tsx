import { PollProp } from "../utils/interfaces";

export default function PollResults(props: PollProp): JSX.Element {
  const totalVotes = props.options.reduce((prev, curr) => prev + curr.votes, 0);
  const totalText =
    totalVotes === 1 ? "vote was recorded" : "votes were recorded";

  return (
    <>
      <h2>Final results!</h2>
      <h3>{`${totalVotes} ${totalText}`}</h3>
      {props.options
        .sort((a, b) => b.votes - a.votes)
        .map((o, i) => {
          return (
            <span key={o.optionNumber} className="viewpoll-span">
              <p>{i + 1}.</p>
              <p>{o.option}</p>
              <p className="vote-text">{o.votes} votes</p>
            </span>
          );
        })}
    </>
  );
}
