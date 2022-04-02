import { createRef, RefObject, useEffect, useState } from "react";
import Option from "./Option";
import { OptionProps } from "../utils/interfaces";
export default function OptionsController(): JSX.Element {
  const inputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  const intialOptions: OptionProps[] = [
    {
      onKeyPressFunction: onOptionKeyPress,
      onButtonClickFunction: onButtonPress,
      active: true,
      id: 0,
      text: "",
    },
    {
      onKeyPressFunction: onOptionKeyPress,
      onButtonClickFunction: onButtonPress,
      active: false,
      id: 1,
      text: "",
      focusRef: inputRef,
    },
  ];

  const [options, setOptions] = useState<OptionProps[]>(intialOptions);
  const [lastKeyPress, setLastKeyPress] = useState("");

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
        onButtonClickFunction: onButtonPress,
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

  function onButtonPress(optionObject: OptionProps) {
    const newOptions = [...options];
    const optionIndex = options.findIndex((o) => o.id === optionObject.id);
    const firstHalf: OptionProps[] = newOptions.slice(0, optionIndex);
    const secondHalf: OptionProps[] = newOptions.slice(optionIndex + 1);
    const adjustedSecondHalf: OptionProps[] = secondHalf.map((o) =>
      Object.assign(o, { id: o.id })
    );
    setOptions(firstHalf.concat(adjustedSecondHalf));
  }

  useEffect(() => {
    focus();
  });

  return (
    <>
      <section>
        {options.map((o, i) => (
          <span key={o.id}>
            <Option
              onKeyPressFunction={onOptionKeyPress}
              onButtonClickFunction={onButtonPress}
              active={o.active}
              id={o.id}
              text={o.text}
              hasButton={i === 0 ? false : true}
              focusRef={determineFocusRef(i)}
            />
          </span>
        ))}
      </section>
      <button>Open Poll!</button>
    </>
  );
}
