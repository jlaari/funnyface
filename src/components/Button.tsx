import React from "react";
import { color } from "../styles/theme";

interface ButtonProps {
  disabled: boolean;
}

const Button: React.FunctionComponent<
  ButtonProps & React.HTMLAttributes<HTMLElement>
> = ({ children, disabled, ...rest }) => {
  return (
    <button disabled={disabled} className="button" {...rest}>
      {children}
      {/*language=CSS*/}
      <style jsx>{`
        .button {
          cursor: pointer;
          padding: 20px 50px;
          background-color: ${color.red};
          border: 0;
          border-radius: 4px;
        }
        .button:disabled {
          opacity: 0.5;
        }
      `}</style>
    </button>
  );
};

export default Button;
