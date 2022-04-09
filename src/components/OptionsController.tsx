import { createRef, RefObject, useEffect, useState } from "react";
import Option from "./Option";
import { postData } from "../utils/requests";
import { OptionProps, pollUrlProps, OptionData } from "../utils/interfaces";
import { apiBaseUrl } from "../utils/global_vars";
//import '../styles/main-style.css';

export default function OptionsController(): JSX.Element {
  const inputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  const intialOptions: OptionProps[] = [
    {
      onKeyPressFunction: onOptionKeyPress,
      onButtonClickFunction: onOptionButtonClick,
      active: true,
      id: 0,
      text: "",
    },
    {
      onKeyPressFunction: onOptionKeyPress,
      onButtonClickFunction: onOptionButtonClick,
      active: false,
      id: 1,
      text: "",
      focusRef: inputRef,
    },
  ];

  const [options, setOptions] = useState<OptionProps[]>(intialOptions);
  const [lastKeyPress, setLastKeyPress] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [pollUrls, setPollUrls] = useState<pollUrlProps>();

  function getNextId() {
    const optionIds = options.map((o) => o.id);
    const highestId = Math.max(...optionIds);
    return highestId + 1;
  }

  function onOptionKeyPress(
    event: React.KeyboardEvent,
    optionObject: OptionProps
  ) {
    const keyPressed: string = event.key;
    setLastKeyPress(keyPressed);
    const inputText = (event.target as HTMLInputElement).value;
    const optionIndex = options.findIndex((o) => o.id === optionObject.id);

    options[optionIndex].text = inputText;
    if (keyPressed === "Enter" && inputText.length > 0) {
      const newPenultimateOption = Object.assign(options[options.length - 1], {
        active: true,
      });
      const newLastOption: OptionProps = {
        onKeyPressFunction: onOptionKeyPress,
        onButtonClickFunction: onOptionButtonClick,
        active: false,
        id: getNextId(),
        text: "",
        focusRef: inputRef,
      };
      setOptions((previousOptions) => [
        ...previousOptions.slice(0, -1),
        newPenultimateOption,
        newLastOption,
      ]);
    } else {
      const replacementObject = Object.assign(options[optionIndex], {
        text: inputText,
      });
      const newOptions: OptionProps[] = [...options];
      newOptions[optionIndex] = replacementObject;
      setOptions(newOptions);
    }
  }

  function focus() {
    if (inputRef.current && lastKeyPress === "Enter") {
      inputRef.current.focus();
    }
  }

  function determineFocusRef(i: number) {
    if (options.length < 3) {
      return i === options.length - 1 ? inputRef : undefined;
    } else {
      return i === options.length - 2 ? inputRef : undefined;
    }
  }

  function onOptionButtonClick(optionObject: OptionProps) {
    const newOptions = [...options];
    const optionIndex = options.findIndex((o) => o.id === optionObject.id);
    const firstHalf: OptionProps[] = newOptions.slice(0, optionIndex);
    const secondHalf: OptionProps[] = newOptions.slice(optionIndex + 1);
    const adjustedSecondHalf: OptionProps[] = secondHalf.map((o) =>
      Object.assign(o, { id: o.id })
    );
    setOptions(firstHalf.concat(adjustedSecondHalf));
  }

  async function onSubmitButtonClick() {
    const optionsArray: OptionProps[] = options.filter(
      (o) => o.text.length > 0
    );
    const optionsArrayData: OptionData[] = optionsArray.map((o) => ({
      name: o.text,
      count: 0,
    }));
    const requestBody = {
      question: questionText,
      options: optionsArrayData,
      openTime: new Date().toISOString,
      closeTime: new Date().toISOString,
      password: "pass",
    };
    const pollUrlData: pollUrlProps = await postData(
      `${apiBaseUrl}poll`,
      requestBody
    );
    const urlObj: pollUrlProps = {
      voteUrl: pollUrlData.voteUrl,
      masterUrl: pollUrlData.masterUrl,
    };
    setPollUrls(urlObj);
  }

  function onQuestionChange(newText: string): void {
    setQuestionText(newText);
  }

  useEffect(() => {
    focus();
  });

  if (!pollUrls) {
    return (
      <>
        <section className="flex-container-column centre-children">
          <div>
            <input
              value={questionText}
              onChange={(e) => onQuestionChange(e.target.value)}
              className="question-input"
              placeholder="Type your question here!"
            ></input>
          </div>
          <div className="flex-container-column">
            {options.map((o, i) => (
              <span key={o.id} className="option-span flex-container-row">
                <Option
                  onKeyPressFunction={onOptionKeyPress}
                  onButtonClickFunction={onOptionButtonClick}
                  active={o.active}
                  id={o.id}
                  text={o.text}
                  hasButton={i === 0 ? false : true}
                  focusRef={determineFocusRef(i)}
                  placeHolder={`Option ${i + 1}...`}
                />
              </span>
            ))}
          </div>
          <button onClick={onSubmitButtonClick} className="button-confirm">
            Open Poll!
          </button>
        </section>
      </>
    );
  } else {
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
            <p className="poll-label">The master URL is:</p>
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
            </span>

            <p className="poll-label">The voting URL is:</p>
            <span className="flex-container-row">
              <p className="poll-link">{pollUrls.voteUrl}</p>
              <button
                onClick={() => navigator.clipboard.writeText(pollUrls.voteUrl)}
                className="copy-button"
              >
                Copy
              </button>
            </span>
          </div>
        </section>
      </>
    );
  }
}
