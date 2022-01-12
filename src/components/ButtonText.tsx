import React from "react";
import { color, color as themeColor, font } from "../styles/theme";

type Variant = "primary" | "secondary";

export interface ButtonTextProps {
  variant: Variant;
}

const ButtonText: React.FunctionComponent<ButtonTextProps> = ({
  children,
  variant,
}) => {
  return (
    <div className={`button-text ${variant}`}>
      {children}
      {/*language=CSS*/}
      <style jsx>{`
        .button-text {
          max-width: 100%;
          border-radius: 4px;
        }
        .button-text.primary {
          color: ${color.white};
        }
        .button-text.secondary {
          font-family: ${font.kavoon};
          text-align: center;
          border: 1px solid ${color.red};
          color: ${color.red};
          padding: 15px;
          font-size: 18px;
          line-height: 22px;
        }
      `}</style>
    </div>
  );
};

export default ButtonText;
