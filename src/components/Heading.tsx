import React from "react";
import { breakpoints, color, font } from "../styles/theme";

type HeadingStyle = "h1";

export interface HeadingProps {
  style: HeadingStyle;
}

const Heading: React.FunctionComponent<HeadingProps> = ({
  children,
  style,
  ...rest
}) => {
  const Tag = style;
  return (
    <Tag className="heading" {...rest}>
      {children}
      {/*language=CSS*/}
      <style jsx>{`
        .heading {
          margin: 0;
        }
        h1 {
          line-height: 1.15;
          font-size: 2.5rem;
          color: ${color.red};
          text-align: center;
          font-family: ${font.kavoon};
        }
        @media ${breakpoints.medium} {
          h1 {
            font-size: 4rem;
          }
        }
      `}</style>
    </Tag>
  );
};

export default Heading;
