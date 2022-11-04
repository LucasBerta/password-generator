import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slider,
  Tooltip,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import "./passwordGenerator.scss";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [characterLength, setCharacterLength] = useState(10);
  const [includeUppercase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setNumbers] = useState(true);
  const [includeSymbols, setSymbols] = useState(false);

  function getRandomChars(characterLength, chars) {
    let pass = "";
    for (let i = pass.length; i < characterLength; i++) {
      const randomChar = Math.floor(Math.random() * chars.length);
      pass += chars.substring(randomChar, randomChar + 1);
    }
    return pass;
  }

  const generatePassword = useCallback(() => {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()";

    let chars = "";
    let pass = "";
    if (includeUppercase) {
      chars += upperCaseChars;
      pass += getRandomChars(1, upperCaseChars);
    }
    if (includeLowerCase) {
      chars += lowerCaseChars;
      pass += getRandomChars(1, lowerCaseChars);
    }
    if (includeNumbers) {
      chars += numbers;
      pass += getRandomChars(1, numbers);
    }
    if (includeSymbols) {
      chars += symbols;
      pass += getRandomChars(1, symbols);
    }

    pass += getRandomChars(characterLength - pass.length, chars);
    pass = pass
      .split("")
      .sort(() => 0.5 - Math.random()) //Shuffle pass after making sure at least 1 char of each rule is included
      .join("");
    setPassword(pass);
  }, [
    characterLength,
    includeUppercase,
    includeLowerCase,
    includeNumbers,
    includeSymbols,
    setPassword,
  ]);

  return (
    <div className="pass-gen">
      <h2>Password Generator</h2>
      <GeneratedPassword password={password} />
      <PasswordConfig
        characterLength={characterLength}
        includeUppercase={includeUppercase}
        includeLowerCase={includeLowerCase}
        includeNumbers={includeNumbers}
        includeSymbols={includeSymbols}
        onChangeCharacterLength={(e) => setCharacterLength(e.target.value)}
        onChangeIncludeUpperCase={(e) => setIncludeUpperCase(e.target.checked)}
        onChangeIncludeLowerCase={(e) => setIncludeLowerCase(e.target.checked)}
        onChangeIncludeNumbers={(e) => setNumbers(e.target.checked)}
        onChangeIncludeSymbols={(e) => setSymbols(e.target.checked)}
        onClickGenerate={generatePassword}
      />
    </div>
  );
}

function GeneratedPassword({ password }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [password]);

  function copyToClipboard() {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
    });
  }

  return (
    <div className="generated-pass">
      {!!password && <h1 className="pass">{password}</h1>}
      {!password && <h1 className="pass-placeholder">P4$5W0rD!</h1>}
      <div className="copy-pass-container">
        <Tooltip
          title="Copied!"
          open={copied}
          disableInteractive
          disableFocusListener
          disableHoverListener
          disableTouchListener
          arrow
          placement="bottom-end"
        >
          <IconButton
            className="copy-pass"
            disabled={!password}
            onClick={copyToClipboard}
          >
            <ContentCopyIcon fontSize="large" htmlColor="#a4ffaf" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}

function PasswordConfig({
  characterLength,
  includeUppercase,
  includeLowerCase,
  includeNumbers,
  includeSymbols,
  onChangeCharacterLength,
  onChangeIncludeUpperCase,
  onChangeIncludeLowerCase,
  onChangeIncludeNumbers,
  onChangeIncludeSymbols,
  onClickGenerate,
}) {
  function getRating() {
    const values = [
      includeUppercase,
      includeLowerCase,
      includeNumbers,
      includeSymbols,
    ];
    return values.filter((v) => !!v).length;
  }

  function getRatingLabel() {
    if (getRating() === 1) return "Too weak";
    if (getRating() === 2) return "Weak";
    if (getRating() === 3) return "Medium";
    if (getRating() === 4) return "Strong";
    return "";
  }

  function getRatingClass() {
    if (getRating() === 1) return "too-weak";
    if (getRating() === 2) return "weak";
    if (getRating() === 3) return "medium";
    if (getRating() === 4) return "strong";
    return "";
  }

  return (
    <div className="pass-config">
      <div className="character-length-label-container">
        <label>Character Length</label>
        <h1 className="character-length">{characterLength}</h1>
      </div>
      <Slider
        className="character-length-slider"
        color="secondary"
        min={6}
        max={16}
        value={characterLength}
        onChange={onChangeCharacterLength}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeUppercase}
              size="large"
              color="secondary"
              onChange={onChangeIncludeUpperCase}
            />
          }
          label="Include Uppercase Letters"
          className="pass-config-checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeLowerCase}
              size="large"
              color="secondary"
              onChange={onChangeIncludeLowerCase}
            />
          }
          label="Include Lowercase Letters"
          className="pass-config-checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeNumbers}
              size="large"
              color="secondary"
              onChange={onChangeIncludeNumbers}
            />
          }
          label="Include Numbers"
          className="pass-config-checkbox"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeSymbols}
              size="large"
              color="secondary"
              onChange={onChangeIncludeSymbols}
            />
          }
          label="Include Symbols"
          className="pass-config-checkbox"
        />
      </FormGroup>

      <div className="strength-container">
        <label>STRENGTH</label>
        <div className={`strength-rating ${getRatingClass()}`}>
          <h2>{getRatingLabel()}</h2>
          <span className="strength-rating-bar">&nbsp;</span>
          <span className="strength-rating-bar">&nbsp;</span>
          <span className="strength-rating-bar">&nbsp;</span>
          <span className="strength-rating-bar">&nbsp;</span>
        </div>
      </div>
      <Button
        className="generate"
        color="secondary"
        variant="contained"
        fullWidth
        onClick={onClickGenerate}
        disabled={getRating() === 0}
      >
        Generate
        <ArrowForwardIcon />
      </Button>
    </div>
  );
}
