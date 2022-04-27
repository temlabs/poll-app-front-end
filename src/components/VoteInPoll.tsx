import { useEffect, useState } from "react";
import { PollProp } from "../utils/interfaces";
import { patchData, getData } from "../utils/requests";
import { apiBaseUrl } from "../utils/global_vars";
import { useParams } from "react-router-dom";

export default function VoteInPoll(): JSX.Element {
  const [pollData, setPollData] = useState<PollProp>();
  const [lastOptionChanged, setLastOptionChanged] = useState<number>();

  const { pollId } = useParams();
  useEffect(() => {
    function getPollData() {
      getData<PollProp>(`${apiBaseUrl}polls/${pollId}/n`)
        .then((res) => setPollData(res as PollProp))
        .catch((e) => console.log(e));
    }
    getPollData();
  }, [pollId]);

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
