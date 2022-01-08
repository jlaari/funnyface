import React, { ReactNode, useContext } from "react";
import ContentLoader from "react-content-loader";

interface BoxSkeletonProps {
  uniqueKey: string;
  height: number;
  show?: boolean;
}
export const BoxSkeleton: React.FunctionComponent<BoxSkeletonProps> = ({
  uniqueKey,
  height,
  show = true,
}) => {
  const width = "100%";
  const heightPx = height + "px";
  if (show) {
    return (
      <div style={{ width, height: heightPx }}>
        <ContentLoader
          style={{ width, height: heightPx }}
          uniqueKey={uniqueKey}
        >
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </ContentLoader>
      </div>
    );
  }
  return <></>;
};
