import { OptionProps } from "../utils/interfaces";

export default function Option(props: OptionProps): JSX.Element {
  return (
    <>
      <input
        disabled={!props.active}
        onKeyUp={(e) => props.onKeyPressFunction(e, props)}
        ref={props.focusRef}
      ></input>

      {props.hasButton && (
        <button
          disabled={!props.active}
          onClick={() => props.onButtonClickFunction(props)}
        >
          X
        </button>
      )}
    </>
  );
}
