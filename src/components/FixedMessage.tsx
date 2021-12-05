import React from "react";
import Spacing from "./Spacing";

export interface FixedMessageProps {
  title?: string;
  attribute?: string;
  confidence?: string;
}

// Keeps the same height regardless of the given props.
const FixedMessage: React.FunctionComponent<FixedMessageProps> = ({
  title,
  attribute,
  confidence,
}) => {
  const height = 80;
  if (!title) {
    return <Spacing top={height} />;
  }
  return (
    <div className="fixed-message">
      {title}
      <Spacing top={12} bottom={12}>
        ({attribute} - {confidence})
      </Spacing>
      <style jsx>{`
        .fixed-message {
          text-align: center;
          height: ${height}px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default FixedMessage;
