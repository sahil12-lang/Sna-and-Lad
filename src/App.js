import React, { useEffect } from "react";
import "./asd.css";
import { useState } from "react";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function App() {
  const [sampleNumber, setSampleNumber] = useState(0);
  const [currPosi, setCurrPosi] = useState(1);
  const [currPosi2, setCurrPosi2] = useState(1);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const greenMine = [7, 16, 20, 28, 35, 43, 51, 62, 67, 85];
  const redMine = [3, 23, 32, 47, 56, 69, 73, 80, 83, 91, 94, 99];
  const [xPosi, setXposi] = useState(0);
  const [yPosi, setYposi] = useState(0);
  const [teleporting, setTeleportState] = useState(false);
  const [teleporting2, setTeleportState2] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [disableBtn2, setDisableBtn2] = useState(true);
  const [xPosi2, setXposi2] = useState(0);
  const [yPosi2, setYposi2] = useState(0);

  const change = () => {
    let boxX = document.getElementById("box-wrapper").getBoundingClientRect().x;
    let nextElemX = document.getElementById(currPosi.toString()).getBoundingClientRect().x;
    let actualXPosi = nextElemX - boxX + 18;
    setXposi(actualXPosi);
    let calculatedYPosi = Math.floor((currPosi - 1) / 10) * 61;
    setYposi(calculatedYPosi);
    setTimeout(() => {
      if (currPosi === 100) {
        setDisableBtn(true);
        setDisableBtn2(true);
        alert("Winner1");
      }
    }, 1500);
  }
  const change2 = () => {
    let boxX2 = document.getElementById("box-wrapper").getBoundingClientRect().x;
    let nextElemX2 = document.getElementById(currPosi2.toString()).getBoundingClientRect().x;
    let actualXPosi2 = nextElemX2 - boxX2 + 18;
    setXposi2(actualXPosi2);
    let calculatedYPosi2 = Math.floor((currPosi2 - 1) / 10) * 61;
    setYposi2(calculatedYPosi2);
    setTimeout(() => {
      if (currPosi2 === 100) {
        setDisableBtn(true);
        setDisableBtn2(false);
        alert("Winner2")
      }
    }, 1500);
  }

  const shouldTeleport = () => {
    console.log("shouldTeleport called!")
    if (!teleporting) {
      if (redMine.includes(currPosi)) {
        let availableBlock = redMine.map(item => item < currPosi && item).filter(Boolean);
        let newTail = availableBlock[Math.floor(Math.random() * availableBlock.length)];
        console.log("newTail", newTail);
        setTimeout(() => {
          newTail && setCurrPosi(newTail);
          setTeleportState(true);
        }, 2000);

      } else if (greenMine.includes(currPosi)) {

        let availableGBlock = greenMine.map(item => item > currPosi && item).filter(Boolean);
        let greenBlock = availableGBlock[Math.floor(Math.random() * availableGBlock.length)];
        console.log("greenblock", greenBlock);
        setTimeout(() => {
          greenBlock && setCurrPosi(greenBlock);
          setTeleportState(true);
        }, 2000)
      }
    } else setTeleportState(false);

  }
  const shouldTeleport2 = () => {
    console.log("shouldTeleport called!")
    if (!teleporting2) {
      if (redMine.includes(currPosi2)) {
        let availableBlock2 = redMine.map(item => item < currPosi2 && item).filter(Boolean);
        let newTail2 = availableBlock2[Math.floor(Math.random() * availableBlock2.length)];
        console.log("newTail", newTail2);
        setTimeout(() => {
          newTail2 && setCurrPosi2(newTail2);
          setTeleportState2(true);
        }, 2000);
      } else if (greenMine.includes(currPosi2)) {

        let availableGBlock2 = greenMine.map(item => item > currPosi2 && item).filter(Boolean);
        let greenBlock2 = availableGBlock2[Math.floor(Math.random() * availableGBlock2.length)];
        console.log("greenblock", greenBlock2);
        setTimeout(() => {
          greenBlock2 && setCurrPosi2(greenBlock2);
          setTeleportState2(true);
        }, 2000);
      }
    } else setTeleportState2(false)
  }
  useEffect(() => {
    change();
  }, [currPosi]);

  useEffect(() => {
    change2();
  }, [currPosi2]);

  useEffect(() => {
    shouldTeleport();
  }, [xPosi, yPosi]);

  useEffect(() => {
    shouldTeleport2();
  }, [xPosi2, yPosi2])

  const getRandomNumber = () => {
    let min = 1;
    let max = 6;
    let newDice = Math.round(Math.random() * (max - min) + min);
    setSampleNumber(newDice);
    let newPosi = currPosi + newDice;
    if (newPosi <= 100) {
      setCurrPosi(newPosi);
    }
    setDisableBtn(false);
    if (getRandomNumber) {
      setDisableBtn(true);
      setTimeout(() => {
        setDisableBtn2(false);
      }, 2000);
      if (setDisableBtn2 === false) {
        setDisableBtn(false)
      } else if (teleporting === true) {
        setTimeout(() => {
          setDisableBtn(true);
          setDisableBtn2(true);
          shouldTeleport();
        }, 2000);
        // setTimeout(() => {
        //   setDisableBtn2(false);
        // }, 2000);
      }
    }

  };

  const getRandomNumber2 = () => {
    let min = 1;
    let max = 6;
    let newDice2 = Math.round(Math.random() * (max - min) + min);
    setSampleNumber(newDice2);
    let newPosi2 = currPosi2 + newDice2;
    if (newPosi2 <= 100) {
      setCurrPosi2(newPosi2);
    }
    if (getRandomNumber2) {
      setDisableBtn2(true);
      setTimeout(() => {
        setDisableBtn(false)
      }, 2000);
      if (setDisableBtn === false) {
        setDisableBtn2(false)
      } else if (teleporting2 === true) {
        disableBtn2(true);
        setDisableBtn(true);
        teleporting2();
      }
    }
  };

  return (
    <div className="main">
      <div className="uuu" id="box-wrapper">
        <div style={{ display: "block", textAlign: "center" }}>
          <button onClick={getRandomNumber} disabled={disableBtn} style={{ marginTop: "20px" }}>
            Player 1
          </button>
          <button onClick={getRandomNumber2} style={{ marginTop: "20px" }} disabled={disableBtn2}> Player 2 </button>
          <p style={{ margin: 0 }}> {sampleNumber} </p>
        </div>
        <div>
          <div
            className="emote"
            style={{
              transform: `translateX(${xPosi}px) translateY(-${yPosi}px)`,
            }}
          >
            <p className="emoji">&#128512;</p>
          </div>
          <div
            className="emote"
            style={{
              transform: `translateX(${xPosi2}px) translateY(-${yPosi2}px)`,
            }}
          >
            <p className="emoji2"  >&#128527;</p>
          </div>
        </div>

        {arr.map((val, ind, arru) => (
          <div
            className="head"
            style={{
              flexDirection: val % 2 === 0 ? "row-reverse" : "row",
            }}
            key={val.toString()}
          >
            {arr.map((value, index, ar) => (
              <div style={{}}>
                <div
                  id={value + parseInt(ind + "0")}
                  className="block"
                  style={{
                    backgroundColor: redMine.includes(
                      value + parseInt(ind + "0")) ? "rgb(136, 8, 8)" : "white" &&
                        greenMine.includes(value + parseInt(ind + "0")) ? "rgb(34, 139, 34)" : "white" && value % 2 === 0 ? "skyblue" : "skyblue",
                  }}
                  key={value.toString()}
                >
                  <span>{value + parseInt(ind + "0")}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
        <h1 className="heading">Snake and Ladders</h1>
      </div>
    </div>
  );
}