export interface OptionProps {
  onKeyPressFunction: (keyPressed: string, optionId: number) => void;
  onChangeFunction: (inputValue: string, optionObject: OptionProps) => void;
  active: boolean;
  text: string;
  id: number;
}
