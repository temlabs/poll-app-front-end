import { useState } from "react";
import Option from "./Option";
import { OptionProps } from "../utils/interfaces";
export default function OptionsController(): JSX.Element {
  const intialOptions: OptionProps[] = [
    {
      onKeyPressFunction: onOptionKeyPress,
      onChangeFunction: onOptionChange,
      active: true,
      id: 0,
      text: "",
    },
    {
      onKeyPressFunction: onOptionKeyPress,
      onChangeFunction: onOptionChange,
      active: false,
      id: 1,
      text: "",
    },
  ];

  const [options, setOptions] = useState<OptionProps[]>(intialOptions);

  function onOptionChange(optionValue: string, optionObject: OptionProps) {
    const optionIndex = options.findIndex((o) => o.id === optionObject.id);
    options[optionIndex].text = optionValue;
    console.log(`Beginning of onChange func, length is: ${options.length}`);
    const optionIsPenultimate: boolean = optionIndex === options.length - 2; // need a way to identify whether input is penultimate
    if (optionValue.length > 0) {
      if (optionIsPenultimate) {
        console.log("A change in the penultimate option!");
        // activate the input that's currently last
        const newPenultimateObject: OptionProps = Object.assign(
          options[optionIndex + 1],
          { active: true }
        );

        // add a new disabled input to the end
        const newUltimateOption: OptionProps = {
          onKeyPressFunction: onOptionKeyPress,
          onChangeFunction: onOptionChange,
          active: false,
          id: optionIndex + 2,
          text: "",
        };
        setOptions((previousOptions) => [
          ...previousOptions.slice(0, -1),
          newPenultimateObject,
          newUltimateOption,
        ]);
      }
    } else {
      // remove last, disable penultimate
      const newOptions = options.slice(0, -1);
      newOptions[newOptions.length - 1].active = false;
      setOptions(newOptions);
    }
  }

  function onOptionKeyPress(keyPressed: string, optionId: number) {
    //console.log(keyPressed,optionId)
  }

  console.log(
    `At rerender of OptionsController, options length is: ${options.length}`,
    { options }
  );

  return (
    <>
      {options.map((o, i) => (
        <Option
          key={i}
          onKeyPressFunction={onOptionKeyPress}
          onChangeFunction={onOptionChange}
          active={o.active}
          id={o.id}
          text={o.text}
        />
      ))}
    </>
  );
}
