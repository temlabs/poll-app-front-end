import { useEffect, useState } from "react";
import { PollProp } from "../utils/interfaces";
import { patchData } from "../utils/requests";
import { apiBaseUrl } from "../utils/global_vars";

export default function VoteInPoll(): JSX.Element {
  const [pollData, setPollData] = useState<PollProp>();
  const [lastOptionChanged, setLastOptionChanged] = useState<number>();
  const windowHref: string = window.location.href;

  useEffect(() => {
    const pollPathRegexArray: RegExpMatchArray[] = Array.from(
      windowHref.matchAll(RegExp("[^#]*$", "g"))
    );
    const pollId: RegExpMatchArray = pollPathRegexArray[0];
    console.log(`${apiBaseUrl}polls/${pollId.toString()}`);
    fetch(`${apiBaseUrl}polls/${pollId.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        data as PollProp;
        setPollData(data);
      });
  }, [windowHref]);

  function onVoteButtonClick(index: number) {
    if (pollData) {
      // avoid sending null requests
      if (index === lastOptionChanged) {
        return;
      }

      const voteRequestToIncrement = {
        optionNumber: pollData.options[index].optionNumber,
        option: pollData.options[index].option,
        changeVoteBy: 1,
      };

      const voteRequests = [voteRequestToIncrement];

      let voteRequestToDecrement;
      if (lastOptionChanged !== undefined) {
        voteRequestToDecrement = {
          optionNumber: pollData.options[lastOptionChanged].optionNumber,
          option: pollData.options[lastOptionChanged].option,
          changeVoteBy: -1,
        };
        voteRequests.push(voteRequestToDecrement);
      }
      const requestBody = { voteModifications: voteRequests };
      setLastOptionChanged(index);
      patchData(`${apiBaseUrl}polls/${pollData.id}`, requestBody);
    }
  }

  return (
    <>
      <h1 className="vote-question">{pollData?.question}</h1>
      <section className="flex-container-column centre-children">
        {pollData?.options.map((o, i) => {
          return (
            <span className="flex-container-row" key={i}>
              <p className="vote-option">{o.option}</p>
              <button
                onClick={() => onVoteButtonClick(i)}
                className={
                  lastOptionChanged === i
                    ? "vote-button green-background"
                    : "vote-button"
                }
              >
                +1
              </button>
            </span>
          );
        })}
      </section>
    </>
  );
}
