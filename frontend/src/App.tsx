import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useTheme } from "next-themes";
import { Button } from "./components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

function App() {
  const [count, setCount] = useState(0);
  const { setTheme } = useTheme();

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme("light")}
          className="transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Sun className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme("dark")}
          className="transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Moon className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme("system")}
          className="transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Monitor className="h-5 w-5" />
        </Button>
      </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
