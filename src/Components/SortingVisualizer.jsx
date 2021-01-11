import "./styles/SortingVisualizer.css";
import React, { useState, useEffect } from "react";
import * as SortingAlgorithms from "./SortingAlogorithms.js";

const TIMER = 10;
var timer;

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [disableButton, setdisableButton] = useState(false);
  const [auxArray, setAuxArray] = useState([]);
  const [slider, setSlider] = useState(50);
  const [width, setWidth] = useState(4);

  useEffect(() => {
    console.log("disabling effect called");
    setdisableButton(false);
  }, []);

  useEffect(() => {
    console.log("Reset array Effect called");
    var array = resetArray();
    setArray(array);
    var auxArray = array.map((v) => v);
    setAuxArray(auxArray);
  }, [slider]);

  const resetArray = () => {
    console.log("reset func called");
    var array = [];

    if (slider <= 30) {
      for (let i = 0; i < 25; i++) {
        array.push(randomNumbers(5, window.screen.height - 300));
      }      
      setWidth(35);
    } else if (slider > 25 && slider <= 50) {
      for (let i = 0; i < 70; i++) {
        array.push(randomNumbers(5, window.screen.height - 300));
      }
      setWidth(15);
    } else if (slider > 50 && slider <= 75) {
      for (let i = 0; i < 110; i++) {
        array.push(randomNumbers(5, window.screen.height - 300));
      }
      setWidth(8);
    } else {
      for (let i = 0; i < 250; i++) {
        array.push(randomNumbers(5, window.screen.height - 300));
      }
      setWidth(3);
    }
    changeColor();
    var auxArray = array.map((v) => v);
    setAuxArray(auxArray);

    return array;
  };

  const changeColor = () => {
    const arr = array;
    const arrayBars = document.getElementsByClassName("array-bars");
    for (let i = 0; i < arr.length; i++) {
      const barStyle = arrayBars[i].style;
      barStyle.backgroundColor = "turquoise";
    }
  };

  const stopAndReset = () => {
    clearTimeout(timer);
    setArray(resetArray());
  };

  const mergeSort = () => {
    setdisableButton(true);
    const animations = SortingAlgorithms.mergeSort(auxArray);
    // console.log(animations);

    const arrayBars = document.getElementsByClassName("array-bars");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];

        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "#ff9ee6";
        timer = setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * TIMER);
      } else {
        timer = setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * TIMER);
      }
      if (i === animations.length - 1) {
        timer = setTimeout(() => {
          setdisableButton(false);
        }, i * TIMER + 100);
      }
    }
  };

  const quickSort = () => {
    setdisableButton(true);
    const ani = SortingAlgorithms.QuickSortCall(auxArray);
    const animations = ani.animation;
    const animations2 = ani.animation2;

    const arrayBars = document.getElementsByClassName("array-bars");
    var isChange = true;
    for (let i = 0; i < animations.length; i++) {
      if (animations[i].length === 4) {
        const [barOneIdx, barTwoIdx, small, large] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${small}px`;

          barTwoStyle.height = `${large}px`;

          barTwoStyle.backgroundColor = "#ff9ee6";
          if (i === animations.length - 1) {
            barOneStyle.backgroundColor = "#ff9ee6";
          }
        }, i * TIMER);
      } else if (animations[i].length === 2) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        if (isChange) {
          isChange = false;
          setTimeout(() => {
            barOneStyle.backgroundColor = "#ff0000";
            barTwoStyle.backgroundColor = "#ff0000";
          }, i * TIMER);
        } else {
          isChange = true;
          setTimeout(() => {
            barOneStyle.backgroundColor = "turquoise";
            barTwoStyle.backgroundColor = "turquoise";
          }, i * TIMER);
        }
      }
      if (i === animations.length - 1) {
        setTimeout(() => {
          setdisableButton(false);
        }, i * TIMER + 1000);
      }
    }
  };

  const bubbleSort = () => {
    setdisableButton(true);
    const animations = SortingAlgorithms.bubbleSortCall(auxArray);
    var isChange = true;
    const arrayBars = document.getElementsByClassName("array-bars");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i].length === 4) {
        const [barOneIdx, barTwoIdx, small, large] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${small}px`;
          barTwoStyle.height = `${large}px`;
          barTwoStyle.backgroundColor = "#ff9ee6";
          if (i === animations.length - 1) {
            barOneStyle.backgroundColor = "#ff9ee6";
          }
        }, i * TIMER);
      } else if (animations[i].length === 2) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        if (isChange) {
          isChange = false;
          setTimeout(() => {
            barOneStyle.backgroundColor = "red";
            barTwoStyle.backgroundColor = "red";
          }, i * TIMER);
        } else {
          isChange = true;
          setTimeout(() => {
            barOneStyle.backgroundColor = "turquoise";
            barTwoStyle.backgroundColor = "turquoise";
          }, i * TIMER);
        }
      }
      if (i === animations.length - 1) {
        setTimeout(() => {
          setdisableButton(false);
        }, i * TIMER + 1000);
      }
    }
  };

  const heapSort = () => {
    setdisableButton(true);
    const animations = SortingAlgorithms.heapSortCall(auxArray);
    var isChange = true;
    const arrayBars = document.getElementsByClassName("array-bars");
    for (let i = 0; i < animations.length; i++) {
      console.log(animations[i].length);
      if (animations[i].length === 4) {
        const [barOneIdx, barTwoIdx, small, large] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${small}px`;
          barTwoStyle.height = `${large}px`;
          barTwoStyle.backgroundColor = "red";
          setTimeout(() => {
            barTwoStyle.backgroundColor = "#ff9ee6";
          }, i * 0.1);

          if (i === animations.length - 1) {
            barOneStyle.backgroundColor = "#ff9ee6";
          }
          // barTwoStyle.backgroundColor = "red";
        }, i * TIMER);
      } else if (animations[i].length === 2) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        if (isChange) {
          isChange = false;
          setTimeout(() => {
            barOneStyle.backgroundColor = "red";
            barTwoStyle.backgroundColor = "red";
          }, i * TIMER);
        } else {
          isChange = true;
          setTimeout(() => {
            barOneStyle.backgroundColor = "turquoise";
            barTwoStyle.backgroundColor = "turquoise";
          }, i * TIMER);
        }
      } else {
        const [barOneIdx, barTwoIdx, h1, h2, ,] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${h1}px`;
          barTwoStyle.height = `${h2}px`;
        }, i * TIMER);
      }

      if (i === animations.length - 1) {
        setTimeout(() => {
          setdisableButton(false);
        }, i * TIMER + 1000);
      }
    }
  };

  const insertionSort = () => {
    setdisableButton(true);
    const animations = SortingAlgorithms.insertionSortCall(auxArray);
    var isChange = true;
    const arrayBars = document.getElementsByClassName("array-bars");
    for (let i = 0; i < animations.length; i++) {
      if (animations[i].length === 2) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        if (isChange) {
          isChange = false;
          setTimeout(() => {
            barOneStyle.backgroundColor = "red";
            barTwoStyle.backgroundColor = "red";
          }, i * TIMER);
        } else {
          isChange = true;
          setTimeout(() => {
            barOneStyle.backgroundColor = "#95e775";
            barTwoStyle.backgroundColor = "#95e775";
          }, i * TIMER);
        }
      } else if (animations[i].length === 4) {
        const [barOneIdx, barTwoIdx, small, large] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${small}px`;
          barTwoStyle.height = `${large}px`;
          barOneStyle.backgroundColor = "#ff9ee6";
          barTwoStyle.backgroundColor = "#ff9ee6";
          arrayBars[0].style.backgroundColor = "#ff9ee6";
        }, i * TIMER);
        // } else {
        //   const [barOneIdx, h, ,] = animations[i];
        //   const barOneStyle = arrayBars[barOneIdx].style;
        //   setTimeout(() => {
        //     barOneStyle.backgroundColor = "#ff00ea";
        //     // setTimeout(() => {
        //     //   barOneStyle.backgroundColor = "#ff9ee6";
        //     // }, 1000);
        //   }, i * TIMER);
      }
      if (i === animations.length - 1) {
        setTimeout(() => {
          setdisableButton(false);
        }, i * TIMER + 1000);
      }
    }
  };

  return (
    <div>
      <div className="nav-bar">
        <button
          className="reset"
          disabled={disableButton}
          onClick={() => setArray(resetArray())}
        >
          Reset Array
        </button>
        {/* <button className="s-reset" onClick={() => stopAndReset()}>
          Stop And Reset
        </button> */}
        <input
          disabled={disableButton}
          type="range"
          className="slider"
          value={slider}
          min="0"
          max="100"
          onChange={(e) => {
            setSlider(e.target.value);
            setArray(array);
          }}
        />
        <button
          className="merge"
          onClick={() => mergeSort()}
          disabled={disableButton}
        >
          Merge Sort
        </button>
        <button
          className="quick"
          onClick={() => quickSort()}
          disabled={disableButton}
        >
          Quick Sort
        </button>
        <button
          className="bubble"
          onClick={() => bubbleSort()}
          disabled={disableButton}
        >
          Bubble Sort
        </button>
        <button
          className="heap"
          onClick={() => heapSort()}
          disabled={disableButton}
        >
          Heap Sort
        </button>
        <button
          className="insertion"
          onClick={() => insertionSort()}
          disabled={disableButton}
        >
          Insertion Sort
        </button>
      </div>
      <div className="array-container">
        {array.map((bar, idx) => (
          <div
            className="array-bars"
            key={idx}
            style={{
              height: `${bar}px`,
              width: `${width}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="down-bar">
        <div className="text">Project By Mehtab Alam Khan</div>
      </div>
    </div>
  );
}

function randomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
