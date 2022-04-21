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
  placeHolder?: string;
}

export interface pollUrlProps {
  voteUrl: string;
  masterUrl: string;
}

export interface PollProp {
  question: string;
  options: OptionData[];
  openTime: string;
  closeTime: string;
  id: string;
  voteUrl: string;
  masterUrl: string;
}

export interface OptionData {
  option: string;
  votes: number;
  optionNumber: number;
}
