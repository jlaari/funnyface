import React from "react";
import ButtonText from "./ButtonText";
import Spacing from "./Spacing";

export interface FixedNameOrErrorDisplay {
  name?: string;
  age?: string;
  errorMessage?: string;
}

// Keeps the same height regardless of the given props.
const FixedNameOrErrorDisplay: React.FunctionComponent<FixedNameOrErrorDisplay> =
  ({ name, age, errorMessage }) => {
    if ((!name || !age) && !errorMessage) {
      return <Spacing top={54}></Spacing>;
    }
    if (errorMessage) {
      return <ButtonText variant="secondary">{errorMessage}</ButtonText>;
    }
    return (
      <ButtonText variant="secondary">
        {name} - {age} vuotta
      </ButtonText>
    );
  };

export default FixedNameOrErrorDisplay;
