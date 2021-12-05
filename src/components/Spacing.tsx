import React from "react";

export interface SpacingProps {
  top?: number | "auto";
  right?: number | "auto";
  bottom?: number | "auto";
  left?: number | "auto";
}

const Spacing: React.FunctionComponent<SpacingProps> = ({
  children,
  top,
  right,
  bottom,
  left,
  ...rest
}) => {
  return (
    <div className="spacing" {...rest}>
      {children}
      {/*language=CSS*/}
      <style jsx>{`
        .spacing {
          margin-top: ${top}px;
          margin-right: ${right}px;
          margin-bottom: ${bottom}px;
          margin-left: ${left}px;
        }
      `}</style>
    </div>
  );
};

export default Spacing;
