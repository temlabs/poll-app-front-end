import * as io from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PollProp } from "./../utils/interfaces";
import { getData } from "../utils/requests";
import { apiBaseUrl } from "../utils/global_vars";

export default function ViewPoll(): JSX.Element {
  const [pollDetails, setPollDetails] = useState<PollProp>();
  const { masterKey, pollId } = useParams();

  useEffect(() => {
    const setUp = async () => {
      await getData(`${apiBaseUrl}polls/${pollId}/${masterKey}`)
        .then((res) => setPollDetails(res as PollProp))
        .then(() => {
          const socket = io.io(`${apiBaseUrl}?masterKey=${masterKey}`);
          socket.once("connect", () => console.log("hey we're connected!"));

          socket.on("message", (msg) => setPollDetails(msg as PollProp));
        })
        .catch((e) => console.log(e));
    };

    setUp();
  }, [masterKey, pollId]);

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

        {pollDetails?.options
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

        <span className="close-poll">
          <p>Close Poll</p>
        </span>
      </div>
    </>
  );
}
