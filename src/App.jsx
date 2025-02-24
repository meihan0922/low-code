import logo from "./logo.svg";
import Header from "./layout/Header";
import Left from "./layout/Left";
import Right from "./layout/Right";
import Center from "./layout/Center";

function App() {
  return (
    <div className="h-[calc(100vh-var(--spacing)*16)]">
      <Header />
      <div className="flex h-full justify-between">
        <Left />
        <Center />
        <Right />
      </div>
    </div>
  );
}

export default App;
