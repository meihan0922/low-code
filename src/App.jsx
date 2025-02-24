import logo from "./logo.svg";
import Header from "./layout/Header";
import Left from "./layout/Left";
import Right from "./layout/Right";
import Center from "./layout/Center";
import { useCanvas } from "./store/canvas";
import { CanvasContext } from "./Context";

function App() {
  const canvas = useCanvas();

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
