import React, { ReactNode } from "react";
import { BoxSkeleton } from "./BoxSkeleton";
import Spacing from "./Spacing";

export interface FixedMessageProps {
  title?: string;
  attribute?: string;
  value?: string;
  loading: boolean;
}

// Keeps the same height regardless of the given props.
// Shows same height skeleton, when loading.
const FixedMessage: React.FunctionComponent<FixedMessageProps> = ({
  title,
  attribute,
  value,
  loading,
}) => {
  const height = 80;
  if (loading) {
    return (
      <div className="fixed-message-skeleton">
        <Spacing top={5} bottom={15}>
          <BoxSkeleton
            uniqueKey={"fixed-message-skeleton"}
            height={height - 20}
          />
        </Spacing>
      </div>
    );
  }
  if (!title) {
    return <Spacing top={height} />;
  }
  return (
    <div className="fixed-message">
      {title}
      <Spacing top={12} bottom={12}>
        (
        <i>
          {attribute} - {value}
        </i>
        )
      </Spacing>
      <style jsx>{`
        .fixed-message {
          text-align: center;
          height: ${height}px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          animation: fadeIn linear 0.4s;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
      `}</style>
    </div>
  );
};

interface FixedMessageContentProps {
  title: string;
  attribute?: string;
  value?: string;
}

const FixedMessageContent: React.FunctionComponent<FixedMessageContentProps> =
  ({ title, attribute, value }) => {
    return (
      <div className="fixed-message-content">
        {title}
        <Spacing top={12} bottom={12}>
          (
          <i>
            {attribute} - {value}
          </i>
          )
        </Spacing>
        <style jsx>{`
          .fixed-message-content {
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
      </div>
    );
  };

export default FixedMessage;
