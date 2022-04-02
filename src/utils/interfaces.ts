import React, { RefObject } from "react";

export interface OptionProps {
  onKeyPressFunction: (
    event: React.KeyboardEvent<HTMLInputElement>,
    optionObject: OptionProps
  ) => void;
  onButtonClickFunction: (optionObject: OptionProps) => void;
  active: boolean;
  text: string;
  id: number;
  focusRef?: RefObject<HTMLInputElement>;
  hasButton?: boolean;
}
