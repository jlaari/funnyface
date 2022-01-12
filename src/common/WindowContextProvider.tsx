import React, { useEffect, useState } from "react";
import { breakpoints } from "../styles/theme";

// Credits to AP.

export type Breakpoint = "small" | "medium" | "large" | "extraLarge";

export const WindowContext = React.createContext<{
  breakpoint: Breakpoint | undefined;
}>({
  breakpoint: undefined,
});

function getBreakpoint(): Breakpoint | undefined {
  if (!process.browser || !window || !window.matchMedia) {
    return;
  }
  if (window.matchMedia(breakpoints.large).matches) {
    return "large";
  } else if (window.matchMedia(breakpoints.medium).matches) {
    return "medium";
  } else {
    return "small";
  }
}

const WindowContextProvider: React.FunctionComponent = ({ children }) => {
  const [breakpoint, setBreakpoint] =
    useState<Breakpoint | undefined>(undefined);
  const updateBreakpoint = (newBreakpoint: Breakpoint | undefined) => {
    if (newBreakpoint && breakpoint !== newBreakpoint) {
      setBreakpoint(newBreakpoint);
    }
  };
  const onResize = () => {
    updateBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  });

  return (
    <WindowContext.Provider value={{ breakpoint }}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowContextProvider;
