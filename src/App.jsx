import logo from "./logo.svg";
import Header from "./layout/Header";
import Left from "./layout/Left";
import Right from "./layout/Right";
import Center from "./layout/Center";
import { CanvasContext } from "./Context";
import { useCanvas } from "./store/hooks";
import { useEffect, useReducer } from "react";

function App() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const canvas = useCanvas();

  useEffect(() => {
    return canvas.subscribe(() => forceUpdate());
  }, []);

  return (
    <div className="h-[calc(100vh-var(--spacing)*16)]">
      <CanvasContext.Provider value={canvas}>
        <Header />
        <div className="flex h-full justify-between">
          <Left />
          <Center />
          <Right />
        </div>
      </CanvasContext.Provider>
    </div>
  );
}

export default App;
