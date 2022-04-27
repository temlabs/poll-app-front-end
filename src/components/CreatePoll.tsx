import { createRef, RefObject, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/requests";
import {
  OptionProps,
  pollUrlProps,
  OptionData,
  PollProp,
} from "../utils/interfaces";
import { apiBaseUrl } from "../utils/global_vars";
import PollConfig from "./PollConfig";
import LoadingPoll from "./LoadingPoll";

export default function OptionsController(): JSX.Element {
  const inputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  const firstInputRef: RefObject<HTMLInputElement> =
    createRef<HTMLInputElement>();

  const initialOptions: OptionProps[] = [
    {
      onKeyPressFunction: handleOptionInputKeyPress,
      onDeleteButtonClickFunction: deleteOption,
      active: true,
      id: 0,
      text: "",
      focusRef: firstInputRef,
    },
    {
      onKeyPressFunction: handleOptionInputKeyPress,
      onDeleteButtonClickFunction: deleteOption,
      active: false,
      id: 1,
      text: "",
      focusRef: inputRef,
    },
  ];

  const [options, setOptions] = useState<OptionProps[]>(initialOptions);
  const [questionText, setQuestionText] = useState("");
  const [lastKeyPress, setLastKeyPress] = useState("");
  const [loading, setLoadingStatus] = useState(false);
  const navigate = useNavigate();

  const abortController = new AbortController();
  const signal = abortController.signal;

  function deleteOption(optionObject: OptionProps) {
    const newOptions = [...options];
    const optionIndex = options.findIndex((o) => o.id === optionObject.id);
    const firstHalf: OptionProps[] = newOptions.slice(0, optionIndex);
    const secondHalf: OptionProps[] = newOptions.slice(optionIndex + 1);
    const adjustedSecondHalf: OptionProps[] = secondHalf.map((o) =>
      Object.assign(o, { id: o.id })
    );
    setOptions(firstHalf.concat(adjustedSecondHalf));
  }

  function handleOptionInputKeyPress(
    event: React.KeyboardEvent,
    optionObject: OptionProps
  ) {
    const keyPressed: string = event.key;
    setLastKeyPress(keyPressed);
    const inputText = (event.target as HTMLInputElement).value;
    const optionIndex = options.findIndex((o) => o.id === optionObject.id);

    options[optionIndex].text = inputText;
    if (keyPressed === "Enter" && inputText.length > 0) {
      createNewOption();
    } else {
      updateOptionText(optionIndex, inputText);
    }
  }

  function createNewOption() {
    const newPenultimateOption = Object.assign(options[options.length - 1], {
      active: true,
    });
    const newLastOption: OptionProps = {
      onKeyPressFunction: handleOptionInputKeyPress,
      onDeleteButtonClickFunction: deleteOption,
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
  }

  function updateOptionText(optionIndex: number, newOptionText: string) {
    const replacementObject = Object.assign(options[optionIndex], {
      text: newOptionText,
    });
    const newOptions: OptionProps[] = [...options];
    newOptions[optionIndex] = replacementObject;
    setOptions(newOptions);
  }

  function handleQuestionInputChange(newText: string): void {
    setQuestionText(newText);
  }

  function getNextId() {
    const optionIds = options.map((o) => o.id);
    const highestId = Math.max(...optionIds);
    return highestId + 1;
  }

  async function submitPoll() {
    window.history.pushState(
      [questionText, JSON.parse(JSON.stringify(options)), loading],
      "",
      "http://localhost:3000/"
    );
    setLoadingStatus(true);

    const optionsArray: OptionProps[] = options.filter(
      (o) => o.text.length > 0
    );
    const optionsArrayData: OptionData[] = optionsArray.map((o, i) => ({
      option: o.text,
      votes: 0,
      optionNumber: i,
    }));
    const requestBody = {
      question: questionText,
      options: optionsArrayData,
      openTime: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    const createdPoll = await postData(
      `${apiBaseUrl}poll`,
      requestBody,
      signal
    ).catch((e) => console.log(e));

    if (createdPoll) {
      createdPoll as PollProp;
      setLoadingStatus(false);
      const urlObj: pollUrlProps = {
        voteUrl: (createdPoll as PollProp).voteUrl,
        masterUrl: (createdPoll as PollProp).masterUrl,
        questionText: questionText,
      };

      navigate("/created", { state: urlObj });
    }
  }

  return (
    <>
      {(!loading && (
        <PollConfig
          submitPoll={submitPoll}
          handleQuestionInputChange={handleQuestionInputChange}
          handleOptionInputKeyPress={handleOptionInputKeyPress}
          deleteOption={deleteOption}
          options={options}
          questionText={questionText}
          lastKeyPress={lastKeyPress}
        />
      )) || <LoadingPoll />}
    </>
  );
}
