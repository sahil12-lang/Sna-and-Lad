import React, { useCallback, useEffect } from "react";
import "./asd.css";
import { useState } from "react";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function App() {
  const [sampleNumber, setSampleNumber] = useState(0);
  const [sampleNumber2, setSampleNumber2] = useState(false);
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
  const [Player1Key, movePlayer1Key] = useState(true);
  const [Player2Key, movePlayer2Key] = useState(false);
  

  const change = () => {
    let boxX = document.getElementById("box-wrapper").getBoundingClientRect().x;
    let nextElemX = document.getElementById(currPosi.toString()).getBoundingClientRect().x;
    let actualXPosi = nextElemX - boxX + 18;
    setXposi(actualXPosi);
    let calculatedYPosi = Math.floor((currPosi - 1) / 10) * 61;
    setYposi(calculatedYPosi);
    setTimeout(() => {
       if(currPosi===100){
        alert("winner1");
        setCurrPosi(1);
        setCurrPosi2(1);
        setSampleNumber2(0);
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
        alert("Winner2");
        setCurrPosi(1);
        setCurrPosi2(1);
        setSampleNumber2(0);
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
          if (Player1Key === false) {
            movePlayer1Key(false);
            movePlayer2Key(false);
            if (Player2Key === false) {
              setTimeout(() => {
                movePlayer2Key(true);
                setDisableBtn2(false);
              }, 2000);
            }
          }
        }, 2000);

      } else if (greenMine.includes(currPosi)) {

        let availableGBlock = greenMine.map(item => item > currPosi && item).filter(Boolean);
        let greenBlock = availableGBlock[Math.floor(Math.random() * availableGBlock.length)];
        movePlayer2Key(false);
        console.log("greenblock", greenBlock);
        setTimeout(() => {
          greenBlock && setCurrPosi(greenBlock);
          setTeleportState(true);
          if (Player1Key === false) {
            movePlayer1Key(false);
            movePlayer2Key(false);
            if (Player2Key === false) {
              setTimeout(() => {
                movePlayer2Key(true);
                setDisableBtn2(false);
              }, 2000);
            }
          }
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
          if (Player2Key === false) {
            movePlayer1Key(false);
            movePlayer2Key(false);
            if (Player1Key === false) {
              setTimeout(() => {
                movePlayer1Key(true);
                setDisableBtn(false)
              }, 2000);
            }
          }
        }, 2000);

      } else if (greenMine.includes(currPosi2)) {

        let availableGBlock2 = greenMine.map(item => item > currPosi2 && item).filter(Boolean);
        let greenBlock2 = availableGBlock2[Math.floor(Math.random() * availableGBlock2.length)];
        console.log("greenblock", greenBlock2);
        setTimeout(() => {
          greenBlock2 && setCurrPosi2(greenBlock2);
          setTeleportState2(true);
          if (Player2Key === false) {
            movePlayer1Key(false);
            movePlayer2Key(false);
            if (Player1Key === false) {
              setTimeout(() => {
                setDisableBtn(false)
                movePlayer1Key(true)
              }, 2000);
            }
          }
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
  }, [xPosi2, yPosi2]);


  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 37:
        if (Player1Key) {
          getRandomNumber();
          movePlayer1Key(false);
          setTimeout(() => {
            movePlayer2Key(true);
          }, 2000);
          setTimeout(() => {
            if (currPosi === 100) {
              alert("Winner1");
              movePlayer1Key(false);
              movePlayer2Key(false);
            }
          }, 1500);
        }
        break;
      case 39:
        if (Player2Key) {
          getRandomNumber2();
          movePlayer2Key(false);
          setTimeout(() => {
            movePlayer1Key(true);
          }, 2000);
          setTimeout(() => {
            if (currPosi2 === 100) {
              alert("Winner2");
              movePlayer1Key(false);
              movePlayer2Key(false);
            }
          }, 1500);
        }
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

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
      setSampleNumber2(false)
      setDisableBtn(true);
      setTimeout(() => {
        setDisableBtn2(false);
        if(sampleNumber){
        setSampleNumber2(true);
        // setSampleNumber(false);
        } 
      }, 2000);
      if (setDisableBtn2 === false) {
        setDisableBtn(false)
      } else if (teleporting === true) {
        setTimeout(() => {
          movePlayer1Key(false);
          movePlayer2Key(false);
        }, 2000);
      } 
    }
  }; 

  const getRandomNumber2 = () => {
    let min = 1;
    let max = 6;
    let newDice2 = Math.round(Math.random() * (max - min) + min);
    setSampleNumber2(newDice2);
    let newPosi2 = currPosi2 + newDice2;
    if (newPosi2 <= 100) {
      setCurrPosi2(newPosi2);
    }
    if (getRandomNumber2) {
      setSampleNumber(false)
      setDisableBtn2(true);
      setTimeout(() => {
        setDisableBtn(false);
        if(sampleNumber2){
        setSampleNumber(true);
        // setSampleNumber2(false);
        }
      }, 2000);
      if (setDisableBtn === false) {
        setDisableBtn2(false)
      } else if (teleporting2 === true) {
        setTimeout(() => {
          movePlayer1Key(false);
          movePlayer2Key(false);
        }, 2000);
      }
      //  else if (currPosi2 === 100) {
      //   alert("winner2");
      //   setCurrPosi(1);
      //   setCurrPosi2(1);
      //   setSampleNumber2(0);
      // }
    }
  };  

  return (
    <div className="main">
      <div className="left">
        <span className="description">Game Rules:-</span> <br /> <br />
        <span className="text"> 1. Play with Arrow keys :- </span> <br />
        <span className="text"> a) Left Arrow Key for Player1 <br />
          b) Right Arrow Key for Player2  <br />
          (When you'll press the arrow key <br /> it'll generate a Random Dice Number)
        </span> <br /> <br />
        <span className="text"> 2. You'll get the dice Number below the Board <br />
          <span>a) Player1 &#128512;  <span style={{ color: "darkblue" }}> (DarkBlue Color Number) </span> </span> <br />
          <span>b) Player2 &#128527;<span style={{ color: "darkgreen" }}> (DarkGreen Color Number) </span></span>
        </span> <br /> <br />
        <span className="text"> 3. <span className="text-green"> Green Blocks </span> will upgrade you to <br />
          another Green Block
        </span> <br /> <br />
        <span className="text"> 4.<span className="text-red"> Red Blocks </span> will downgrade you to <br />
          another Red Block
        </span> <br /> <br />

      </div>
      <div className="center" >
        <div className="uuu" id="box-wrapper">
          <div>
            <div
              className="emote"
              style={{
                transform: `translateX(${xPosi}px) translateY(-${yPosi}px)`,
              }}
            >
              <p className="emoji" >&#128512;</p>
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
                          greenMine.includes(value + parseInt(ind + "0")) ? "rgb(34, 139, 34)" : "white"
                            && value % 2 === 0 ? "skyblue" : "skyblue",
                    }}
                    key={value.toString()}
                  >
                    <span>{value + parseInt(ind + "0")}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <h1 className="heading">Teleporting Blocks</h1>
        </div>
        <div className="fade-in">
          <span style={{ color: "darkblue", marginLeft: "50px" }}>  {sampleNumber} </span>
          <span style={{ color: "darkgreen" }}> {sampleNumber2} 
          <span className="player" style={{ display: Player2Key === false ? "none" : "block" }}> Next Turn Player2 </span>
            </span>
          <span className="player" style={{ display: Player1Key === false ? "none" : "block", color: "darkblue" }}> Next Turn Player1 </span>
        </div>
      </div>
    </div>
  );
}
