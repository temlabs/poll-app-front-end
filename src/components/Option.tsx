import { OptionProps } from "../utils/interfaces";

export default function Option(props: OptionProps): JSX.Element {
  const placeHolder: string =
    props.placeHolder === undefined ? "Enter option" : props.placeHolder;
  return (
    <>
      <input
        disabled={!props.active}
        onKeyUp={(e) => props.onKeyPressFunction(e, props)}
        ref={props.focusRef}
        placeholder={props.active ? placeHolder : ""}
      ></input>

      {props.hasButton && (
        <button
          className="input-button"
          disabled={!props.active}
          onClick={() => props.onButtonClickFunction(props)}
        ></button>
      )}
    </>
  );
}
