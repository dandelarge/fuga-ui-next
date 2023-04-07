import React, { useEffect, useState, useContext, useMemo, ComponentProps } from "react";

interface windowSizeContextType {
  windowWidth: number;
}


export const windowSizeContext = React.createContext<windowSizeContextType>({ windowWidth: 0 });

export function WindowSizeContextProvider({ children }: ComponentProps<any>) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = useMemo(() => ({ windowWidth }), [windowWidth]);

  return (
    <windowSizeContext.Provider value={value}>
      {children}
    </windowSizeContext.Provider>
  );
}

export function useWindowSizeContext() {
  return useContext(windowSizeContext);
}
