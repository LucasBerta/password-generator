import PasswordGenerator from "./components/passwordGenerator/PasswordGenerator";
import "./app.scss";

function App() {
  return (
    <div className="app">
      <PasswordGenerator />

      <div className="attribution">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://github.com/LucasBerta"
          target="_blank"
          rel="noreferrer"
        >
          Lucas Berta
        </a>
        .
      </div>
    </div>
  );
}

export default App;
