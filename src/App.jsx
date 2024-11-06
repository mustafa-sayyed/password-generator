import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charatersAllowed, setCharacteratersAllowed] = useState(false);
  const [copyState, setCopyState] = useState("copy");

  // useRef Hook
  const copyText = useRef("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let passData = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) passData += "0123456789";
    if (charatersAllowed) passData += "!@#$%^&*_-=+/\\";
    while (pass.length < length) {
      pass += passData[Math.floor(Math.random() * passData.length)];
    }
    setPassword(pass);
    console.log(password);
  }, [setPassword, length, numbersAllowed, charatersAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, charatersAllowed]);

  useEffect(() => {
    setCopyState("copy");
  }, [generatePassword, setCopyState]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopyState("copied!");
    copyText.current?.select();
    // copyText.current?.setSelectionRange(0, length);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full w-full ">
        <h1 className="text-6xl ">Password Generator</h1>
        <div className="w-[500px] bg-black bg-opacity-40 p-8 text-center mt-10 rounded-lg flex flex-col justify-center items-start h-fit gap-y-4">
          <div className="flex w-full h-9 bg-white rounded-lg">
            <input
              type="text"
              value={password}
              ref={copyText}
              className="w-full h-9 bg-transparent outline-none text-black px-4 text-[17px]"
              readOnly
            />
            <p
              onClick={copyPassword}
              className="w-28 h-9 bg-blue-600 flex justify-center items-center rounded-r-lg cursor-pointer">
              {copyState}
            </p>
          </div>
          <div className="flex justify-between items-center w-full ">
            <input
              type="range"
              defaultValue={8}
              min={4}
              max={24}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <p>Length:({length})</p>
            <div>
              <input
                type="checkbox"
                id="numbers"
                defaultChecked={numbersAllowed}
                onChange={() => {
                  setNumbersAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numbers">Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="characters"
                defaultChecked={charatersAllowed}
                onChange={() => {
                  setCharacteratersAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characters">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
