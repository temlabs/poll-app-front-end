import { createRef, RefObject, useEffect } from "react";
import Option from "./Option";
import { PollSetupProps } from "../utils/interfaces";

export default function PollSetup(props: PollSetupProps): JSX.Element {
  // Set up references
  const inputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();
  const firstInputRef: RefObject<HTMLInputElement> =
    createRef<HTMLInputElement>();

  function determineFocusRef(i: number) {
    if (i === 0) {
      return firstInputRef;
    }

    const onlyTwoOptions: boolean = props.options.length === 2;

    if (onlyTwoOptions) {
      // input ref goes to last option
      return i === 1 ? inputRef : undefined;
    } else if (props.options.length > 2) {
      // input ref goes to the penultimate option
      return i === props.options.length - 2 ? inputRef : undefined;
    }
  }

  function focusOnFirstOption(event: React.KeyboardEvent): void {
    const keyPressed: string = event.key;
    if (keyPressed === "Enter" && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }

  function updateFocus() {
    if (inputRef.current && props.lastKeyPress === "Enter") {
      inputRef.current.focus();
    }
  }

  useEffect(() => {
    updateFocus();
  });

  return (
    <>
      <section className="flex-container-column centre-children">
        <div>
          <input
            value={props.questionText}
            onChange={(e) => props.handleQuestionInputChange(e.target.value)}
            className="question-input"
            placeholder="Type your question here!"
            onKeyUp={(e) => focusOnFirstOption(e)}
          ></input>
          <p className="instruction-label">Press enter to add an option</p>
        </div>

        <div className="flex-container-column">
          {props.options.map((o, i) => (
            <span key={o.id} className="option-span flex-container-row">
              <Option
                onKeyPressFunction={props.handleOptionInputKeyPress}
                onDeleteButtonClickFunction={props.deleteOption}
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
        <p className="instruction-label">
          A 'No preference' option will automatically be added
        </p>
        <button onClick={props.submitPoll} className="button-confirm">
          Open Poll!
        </button>
      </section>
    </>
  );
}
