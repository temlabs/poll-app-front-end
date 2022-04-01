import { OptionProps } from "../utils/interfaces";

export default function Option(props: OptionProps): JSX.Element {
  return (
    <input
      disabled={!props.active}
      onKeyPress={(e) => props.onKeyPressFunction(e.key, props.id)}
      onChange={(e) => props.onChangeFunction(e.target.value, props)}
    ></input>
  );
}
