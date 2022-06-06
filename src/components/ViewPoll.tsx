import * as io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PollProp } from "./../utils/interfaces";
import { getData, patchData } from "../utils/requests";
import { apiBaseUrl } from "../utils/global_vars";
import PollResults from "./PollResults";

export default function ViewPoll(): JSX.Element {
  const [pollDetails, setPollDetails] = useState<PollProp>({
    question: "",
    options: [],
    openTime: "",
    closeTime: "",
    id: "",
    voteUrl: "",
    masterUrl: "",
  });
  const [pollClosed, setPollClosed] = useState<boolean>(false);
  const { masterKey, pollId } = useParams();

  function closePoll() {
    patchData(`${apiBaseUrl}polls/close/${pollId}`);
    setPollClosed(true);
  }

  useEffect(() => {
    const setUp = async () => {
      await getData(`${apiBaseUrl}polls/${pollId}/${masterKey}`)
        .then((res) => setPollDetails(res as PollProp))
        .then(() => {
          if (!pollDetails?.closeTime) {
            const socket = io.io(`${apiBaseUrl}?masterKey=${masterKey}`);
            socket.once("connect", () => console.log("hey we're connected!"));

            socket.on("message", (msg) => setPollDetails(msg as PollProp));
          }
        })
        .catch((e) => console.log(e));
    };

    setUp();
  }, [masterKey, pollId, pollClosed, pollDetails?.closeTime]);

  return (
    <>
      <div className="viewpoll-div">
        <a
          className="polldetail-text"
          href={pollDetails?.voteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Vote link!
        </a>
        <h1 className="vote-question">{pollDetails.question}</h1>

        <PollResults {...pollDetails} />

        {!pollClosed && (
          <span className="close-poll" onClick={closePoll}>
            <p>Close Poll</p>
          </span>
        )}
      </div>
    </>
  );
}
