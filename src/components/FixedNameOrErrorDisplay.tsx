import React from "react";
import { BoxSkeleton } from "./BoxSkeleton";
import ButtonText from "./ButtonText";
import Spacing from "./Spacing";

export interface FixedNameOrErrorDisplay {
  name?: string;
  age?: string;
  errorMessage?: string;
  loading: boolean;
}

// Keeps the same height regardless of the given props.
// Shows same height skeleton, when loading.
const FixedNameOrErrorDisplay: React.FunctionComponent<FixedNameOrErrorDisplay> =
  ({ name, age, errorMessage, loading }) => {
    const height = 54;
    if (loading) {
      return (
        <BoxSkeleton
          uniqueKey={"fixed-name-or-error-skeleton"}
          height={height}
          show={loading}
        />
      );
    }
    if ((!name || !age) && !errorMessage) {
      return <Spacing top={height}></Spacing>;
    }
    if (errorMessage) {
      return <ButtonText variant="secondary">{errorMessage}</ButtonText>;
    }
    return (
      <ButtonText variant="secondary">
        <div className="fixed-name-content">
          {name} - {age} vuotta
        </div>
        <style jsx>{`
          .fixed-name-content {
            animation: fadeIn linear 0.4s;
          }
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </ButtonText>
    );
  };

export default FixedNameOrErrorDisplay;
