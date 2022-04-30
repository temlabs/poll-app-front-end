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
    getData(`${apiBaseUrl}polls/${pollId}/${masterKey}`).then((res) =>
      setPollDetails(res as PollProp)
    );

    const socket = io.io(`${apiBaseUrl}?masterKey=${masterKey}`);
    socket.once("connect", () => console.log("hey we're connected!"));

    socket.on("message", (msg) => setPollDetails(msg as PollProp));
  }, [masterKey, pollId]);

  return (
    <>
      {pollDetails?.options
        .sort((a, b) => b.votes - a.votes)
        .map((o) => {
          return (
            <span key={o.optionNumber}>
              <p>
                {o.option}: {o.votes}
              </p>
            </span>
          );
        })}
    </>
  );
}
